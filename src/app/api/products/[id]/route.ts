import { NextRequest } from "next/server";
import {
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../../../backend/controllers/productController";

// GET: Retrieve a product by ID
export async function GET(req: NextRequest) {
  return getProductById(req);
}

// PUT: Update a product
export async function PUT(req: NextRequest) {
  return updateProduct(req);
}

// DELETE: Delete a product
export async function DELETE(req: NextRequest) {
  return deleteProduct(req);
}
