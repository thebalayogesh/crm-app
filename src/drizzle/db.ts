import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./schema"
import postgres, { PostgresError } from 'postgres'

const client = postgres(process.env.DATABASE_URL as string)
export const db = drizzle(client, {schema, logger: true})
