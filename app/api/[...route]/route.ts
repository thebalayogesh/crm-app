import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { db } from '../db/db'
import { usersTable } from '../db/schema'

export const runtime = 'nodejs'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!'
  })
})

app.get("/users", async (c) => {
  try {
    const users = await db.select().from(usersTable);
    return c.json({ users });
  } catch (error) {
    return c.json({ error: (error as Error).message }, 500);
  }
});



export const GET = handle(app)
