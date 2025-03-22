// src/app/api/orders/route.ts
import {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrders,
} from "../../../backend/controllers/orderController";
import { NextRequest } from "next/server";

// GET: Retrieve all orders
export async function GET() {
  return getOrders();
}

// POST: Create a new order
export async function POST(req: NextRequest) {
  return createOrder(req);
}

// PUT: Update an existing order
export async function PUT(req: NextRequest) {
  return updateOrder(req);
}

// DELETE: Delete an order
export async function DELETE(req: NextRequest) {
  return deleteOrder(req);
}
