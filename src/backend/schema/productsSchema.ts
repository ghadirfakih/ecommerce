import {
  mysqlTable,
  int,
  varchar,
  float,
  datetime,
} from "drizzle-orm/mysql-core";

export const products = mysqlTable("products", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
  price: float("price"),
  description: varchar("description", { length: 500 }),
  createdAt: datetime("createdAt"),
});

