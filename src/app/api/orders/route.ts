// src/app/api/orders/route.ts
import { NextResponse } from 'next/server';

let orders = [
  { id: 1, productId: 1, quantity: 2, status: 'pending' },
  { id: 2, productId: 2, quantity: 1, status: 'shipped' },
];

// GET: Retrieve all orders
export async function GET() {
  return NextResponse.json(orders);
}

// POST: Create a new order
export async function POST(req: Request) {
  const { productId, quantity, status } = await req.json();

  const newOrder = {
    id: Date.now(),
    productId,
    quantity,
    status,
  };

  orders.push(newOrder);
  return NextResponse.json(newOrder, { status: 201 });
}

// PUT: Update an existing order
export async function PUT(req: Request) {
  const url = new URL(req.url);
  const orderId = parseInt(url.pathname.split('/').pop() || '', 10);
  const { productId, quantity, status } = await req.json();

  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex !== -1) {
    orders[orderIndex] = { id: orderId, productId, quantity, status };
    return NextResponse.json(orders[orderIndex]);
  }

  return NextResponse.json({ message: 'Order not found' }, { status: 404 });
}

// DELETE: Delete an order
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const orderId = parseInt(url.pathname.split('/').pop() || '', 10);

  const orderIndex = orders.findIndex((order) => order.id === orderId);

  if (orderIndex !== -1) {
    orders = orders.filter((order) => order.id !== orderId);
    return NextResponse.json({ message: 'Order deleted successfully' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Order not found' }, { status: 404 });
}
