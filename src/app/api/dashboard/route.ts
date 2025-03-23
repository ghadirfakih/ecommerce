// // C:\Users\HP\Desktop\myreact\ecommerce\src\app\api\dashboard\route.ts
// import { NextResponse } from "next/server";
// import db from "@/backend/config/drizzleConfig"; // Adjust the path based on your setup
// import { orders } from "@/backend/schema/ordersSchema"; // Correct path for orders schema
// import { products } from "@/backend/schema/productsSchema";
// // Adjust schema import based on your structure
// import { desc } from "drizzle-orm";

// export async function GET() {
//   try {
//     // Fetch total orders and products count
//     const totalOrders = await db.select().from(orders).count();
//     const totalProducts = await db.select().from(products).count();

//     // Fetch recent orders (assuming `createdAt` is a field in orders)
//     const recentOrders = await db
//       .select()
//       .from(orders)
//       .orderBy(desc(orders.createdAt))
//       .limit(5);

//     return NextResponse.json({
//       totalOrders: totalOrders[0]?.count || 0,
//       totalProducts: totalProducts[0]?.count || 0,
//       recentOrders,
//     });
//   } catch (error) {
//     console.error("Error fetching dashboard data:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch dashboard data" },
//       { status: 500 }
//     );
//   }
// }
