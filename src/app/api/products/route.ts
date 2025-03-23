import {  NextResponse } from "next/server";
import db from "@/backend/config/drizzleConfig"; 
import { products } from "@/backend/schema/productsSchema";  

// Get all products (for the API endpoint)
export async function GET() {
  try {
    const result = await db.select().from(products); // Ensure this fetches all products
    if (!result.length) {
      return NextResponse.json({ message: "No products found" }, { status: 404 });
    }
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
}
