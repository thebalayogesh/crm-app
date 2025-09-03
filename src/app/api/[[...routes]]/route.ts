import { db } from "@/drizzle/db"
import { UsersTable } from "@/drizzle/schema"
import { Hono } from "hono"
import { handle } from "hono/vercel"


const app = new Hono().basePath("/api")
app.get("/", (c) => {
  return c.text("Hello Hono!")
})
// GET /api/greet
app.get("/greet", (c) => {
  return c.json({
    method: "GET",
    message: "🟢 You sent a GET request!",
    note: "Use this to fetch greetings.",
  })
})
// POST /api/greet
app.post("/greet", async (c) => {
  const { name = "Stranger" } = await c.req.json()
  return c.json(
    {
      method: "POST",
      message: `🟡 Hello, ${name}!`,
      note: "You created a new greeting.",
    },
    201
  )
})
// POST /api/greetheader
app.post("/greetheader", async (c) => {
  const name = c.req.header("name")
  return c.json(
    {
      method: "POST",
      message: `🟡 Hello, ${name}!`,
      note: "You sent the name via headers.",
    },
    201
  )
})
// PUT /api/greet
app.put("/greet", async (c) => {
  const { name } = await c.req.json()
  return c.json(
    {
      method: "PUT",
      message: `🔵 Updated greeting for ${name}.`,
      note: "This simulates an update request.",
    },
    200
  )
})
// DELETE /api/greet
app.delete("/greet", async (c) => {
  const { name } = await c.req.json()
  return c.json(
    {
      method: "DELETE",
      message: `🔴 Farewell, ${name}.`,
      note: "This simulates a deletion.",
    },
    200
  )
})

app.get('/users', async (c)=>{
    const users = await db.select().from(UsersTable);
    return c.json(users)
})

app.post('/users', async (c) => {
  // 1. Parse body
  const body = await c.req.json<{ name: string }>()
  const { name } = body

  // 2. Insert into DB
  const users = await db
    .insert(UsersTable)
    .values({ name })
    .returning({ insertedId: UsersTable.id }) // ✅ correct reference

  // 3. Return JSON response
  return c.json(users[0]) // because returning gives an array
})

// Export handlers for all methods
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)