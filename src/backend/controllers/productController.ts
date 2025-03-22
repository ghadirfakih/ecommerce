import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import db from "../config/drizzleConfig";
import { products } from "../schema/productsSchema";

// Get all products
export const getProducts = async () => {
  try {
    const result = await db.select().from(products);
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Error fetching products", status: 500 });
  }
};

// Get a specific product by ID
export const getProductById = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, parseInt(id as string)));

    if (!result.length) {
      return NextResponse.json({ error: "Product not found", status: 404 });
    }

    return NextResponse.json({ data: result[0] });
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return NextResponse.json({ error: "Error fetching product", status: 500 });
  }
};

// Create a new product
export const createProduct = async (req: NextRequest) => {
  const body = await req.json();
  const { name, price, description, createdAt } = body;
  try {
    const result = await db
      .insert(products)
      .values({
        name,
        price,
        description,
        createdAt: new Date(),
      })
      .$returningId();

    const newProduct = { id: result, name, price, description, createdAt };
    return NextResponse.json({ data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Error creating product", status: 500 });
  }
};

// Update a product
export const updateProduct = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const body = await req.json(); // Use req.body instead of req.json()
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
      .where(eq(products.id, parseInt(id as string)));

    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Error updating product", status: 500 });
  }
};

// Delete a product
export const deleteProduct = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    await db.delete(products).where(eq(products.id, parseInt(id as string)));

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Error deleting product", status: 500 });
  }
};
