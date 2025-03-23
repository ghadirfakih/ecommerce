import { NextRequest, NextResponse } from "next/server";
import db from "@/backend/config/drizzleConfig";
import { products } from"@/backend/schema/productsSchema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(id)));
    if (!result.length) {
      return NextResponse.json({ error: "Product not found", status: 404 });
    }
    return NextResponse.json({ data: result[0] });
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return NextResponse.json({ error: "Error fetching product", status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const { name, price, description, createdAt } = body;
  try {
    await db
      .update(products)
      .set({
        name,
        price,
        description,
        createdAt: new Date(createdAt),
      })
      .where(eq(products.id, parseInt(id)));
    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Error updating product", status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await db.delete(products).where(eq(products.id, parseInt(id)));
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Error deleting product", status: 500 });
  }
}
