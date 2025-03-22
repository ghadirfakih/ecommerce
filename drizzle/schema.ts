import {
  datetime,
  float,
  int,
  mysqlTable,
  varchar,
} from "drizzle-orm/mysql-core";

export const orders = mysqlTable("orders", {
  id: int().autoincrement().notNull(),
  customerName: varchar({ length: 255 }).default("NULL"),
  totalAmount: float().default(0),
  createdAt: datetime({ mode: "string" }).default("NULL"),
});

export const products = mysqlTable("products", {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 255 }).default("NULL"),
  price: float().default(0),
  description: varchar({ length: 500 }).default("NULL"),
  createdAt: datetime({ mode: "string" }).default("NULL"),
});
