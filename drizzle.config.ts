import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql", // 'mysql' | 'sqlite' | 'turso'
  schema: "./src/backend/schema",
  dbCredentials: {
    host: "localhost",
    user: "root",

    database: "ecommerce",
  },
});
