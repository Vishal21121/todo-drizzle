import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema/user.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME!,
    port: Number(process.env.DB_PORT)!
  },
} satisfies Config;
