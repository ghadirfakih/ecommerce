import {
  mysqlTable,
  int,
  varchar,
  float,
  datetime,
} from "drizzle-orm/mysql-core";

export const orders = mysqlTable("orders", {
  id: int("id").primaryKey().autoincrement(),
  customerName: varchar("customerName", { length: 255 }),
  totalAmount: float("totalAmount"),
  createdAt: datetime("createdAt"),
});
