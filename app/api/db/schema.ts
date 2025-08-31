import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: uuid().primaryKey().defaultRandom(),
    email: varchar({ length: 256 }).unique().notNull(),
    passwordHash: varchar({ length: 500 }).notNull(),
    age: integer(),
    createdAt: timestamp({ withTimezone: true }).defaultNow(),
    updatedAt: timestamp({ withTimezone: true }).defaultNow(),
  },
  (table) => [
    check("age_check1", sql`${table.age} <= 120`),
    check("age_check2", sql`${table.age} >= 0`),
  ]
);