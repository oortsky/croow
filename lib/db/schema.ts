import {
  integer,
  pgTable,
  pgEnum,
  varchar,
  serial,
  text,
  timestamp
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "pending",
  "paid",
  "proceeded",
  "received",
  "released",
  "completed",
  "cancelled",
  "refunded"
]);

export const users = pgTable("users", {
  id: varchar("id", { length: 256 }).primaryKey(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 256 }).notNull(),
  bank: text("bank").notNull(),
  account_number: text("account_number").notNull(),
  account_holder_name: text("account_holder_name").notNull()
});

export const transactions = pgTable("transactions", {
  id: varchar("id", { length: 256 }).primaryKey(),
  payer_id: varchar("payer_id", { length: 256 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  payee_id: varchar("payee_id", { length: 256 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  amount: integer("amount").notNull(),
  service_fee: integer("service_fee").notNull(),
  total: integer("total").notNull(),
  note: text("note"),
  status: statusEnum("status").notNull().default("pending"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date())
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertTransaction = typeof transactions.$inferInsert;
export type SelectTransaction = typeof transactions.$inferSelect;
