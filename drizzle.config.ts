import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./app/api/db/drizzle",
  schema: "./app/api/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  casing: "snake_case",
});
