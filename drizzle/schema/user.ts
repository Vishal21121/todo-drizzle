import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp
} from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum('userType',["ADMIN","USER"])

export const users = pgTable("users", {
  id: serial("id")
    .primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  userType: userTypeEnum("userType").default("USER"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});