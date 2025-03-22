import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import db from "../config/drizzleConfig";
import { orders } from "../schema/ordersSchema";

// Get all orders
export const getOrders = async () => {
  try {
    const result = await db.select().from(orders);
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Error fetching orders", status: 500 });
  }
};

// Get a specific order by ID
export const getOrderById = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    const result = await db
      .select()
      .from(orders)
      .where(eq(orders.id, parseInt(id as string)));

    if (!result.length) {
      return NextResponse.json({ error: "Order not found", status: 404 });
    }

    return NextResponse.json({ data: result[0] });
  } catch (error) {
    console.error("Error fetching order by id:", error);
    return NextResponse.json({ error: "Error fetching order", status: 500 });
  }
};

// Create a new order
export const createOrder = async (req: NextRequest) => {
  const body = await req.json();
  const { customerName, totalAmount, createdAt } = body;

  try {
    const result = await db
      .insert(orders)
      .values({
        customerName,
        totalAmount,
        createdAt: new Date(createdAt),
      })
      .$returningId();

    const newOrder = {
      id: result[0].id,
      customerName,
      totalAmount,
      createdAt,
    };
    return NextResponse.json({ data: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Error creating order", status: 500 });
  }
};

// Update an order
export const updateOrder = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const body = await req.json();
  const { customerName, totalAmount, createdAt } = body;

  try {
    await db
      .update(orders)
      .set({
        customerName,
        totalAmount,
        createdAt: new Date(createdAt),
      })
      .where(eq(orders.id, parseInt(id as string)));

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ error: "Error updating order", status: 500 });
  }
};

// Delete an order
export const deleteOrder = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    await db.delete(orders).where(eq(orders.id, parseInt(id as string)));

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ error: "Error deleting order", status: 500 });
  }
};
