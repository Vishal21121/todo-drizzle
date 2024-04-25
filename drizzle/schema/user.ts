import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp
} from "drizzle-orm/pg-core";
import { AvailableUserTypes } from "../../src/utils/constants";

export const userTypeEnum = pgEnum("userType", [
  AvailableUserTypes[0],
  ...AvailableUserTypes.slice(1),
]);

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