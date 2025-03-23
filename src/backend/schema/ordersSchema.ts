import {
  mysqlTable,
  int,
  varchar,
  float,
  datetime,
} from "drizzle-orm/mysql-core";

export const orders = mysqlTable("orders", {
  id: int("id").primaryKey().autoincrement(),
  orderId: varchar("orderId", { length: 255 }),
  productId: varchar("productId", { length: 255 }),
  quantity: int("quantity"),
  status: varchar("status", { length: 255 }),
  customerName: varchar("customerName", { length: 255 }),
  totalAmount: float("totalAmount"),
  createdAt: datetime("createdAt"),
});
