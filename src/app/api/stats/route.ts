// src/app/api/stats/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Your logic to fetch stats (e.g., from a database)
  const stats = { totalProducts: 100, totalOrders: 50 }; // Example data
  return NextResponse.json(stats);
}
