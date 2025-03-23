import { NextResponse } from "next/server"; 
// Ensure this points to your Drizzle configuration
import db from "@/backend/config/drizzleConfig";
import { orders } from "@/backend/controllers/orderController"; // Ensure this points to your Drizzle schema definition
import { eq } from "drizzle-orm"; // Drizzle comparison function

// Fetch order details by ID (GET)
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // Fetch the order from the database using Drizzle
    const order = await db.select().from(orders).where(eq(orders.id, Number(id)));

    if (!order.length) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ message: `Order details for order ${id}`, data: order[0] });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ message: "Error fetching order" }, { status: 500 });
  }
}

// Update an order by ID (PUT)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await request.json();

  try {
    await db
      .update(orders)
      .set({
        customerName: data.customerName,
        totalAmount: data.totalAmount,
        createdAt: new Date(data.createdAt),
      })
      .where(eq(orders.id, Number(id)));

    return NextResponse.json({ message: `Order ${id} updated successfully`, data });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ message: "Error updating order" }, { status: 500 });
  }
}

// Delete an order by ID (DELETE)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await db.delete(orders).where(eq(orders.id, Number(id)));

    return NextResponse.json({ message: `Order ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({ message: "Error deleting order" }, { status: 500 });
  }
}
