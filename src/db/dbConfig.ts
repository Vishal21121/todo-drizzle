import {drizzle} from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as userSchema from "../../drizzle/schema/user";

export const connection = postgres(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

export const db = drizzle(connection, { userSchema });