import { NextRequest } from "next/server";
import {
  createProduct,
  getProducts,
} from "../../../backend/controllers/productController";

// GET: Retrieve all products
export async function GET() {
  return getProducts(); // Call the controller function
}

// POST: Create a new product
export async function POST(req: NextRequest) {
  return createProduct(req); // Call the controller function
}
