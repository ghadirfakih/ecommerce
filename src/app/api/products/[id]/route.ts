import { NextResponse } from "next/server";

let products = [
  { id: 1, name: "Coffee", price: 5.0, description: "Delicious coffee" },
  { id: 2, name: "Tea", price: 3.0, description: "Refreshing tea" },
  // Add more products here
];

// GET: Retrieve a product by ID
export async function GET(req: Request) {
  const urlParts = req.url.split("/");
  const id = urlParts.pop(); // Get the last part, which should be the product ID

  if (!id) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return NextResponse.json({ message: "Invalid Product ID" }, { status: 400 });
  }

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// PUT: Update a product
export async function PUT(req: Request) {
  const urlParts = req.url.split("/");
  const id = urlParts.pop(); // Get the last part, which should be the product ID

  if (!id) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return NextResponse.json({ message: "Invalid Product ID" }, { status: 400 });
  }

  const { name, price, description } = await req.json();

  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products[productIndex] = { id: productId, name, price, description };
    return NextResponse.json(products[productIndex]);
  }

  return NextResponse.json({ message: "Product not found" }, { status: 404 });
}

// DELETE: Delete a product
export async function DELETE(req: Request) {
  const urlParts = req.url.split("/");
  const id = urlParts.pop(); // Get the last part, which should be the product ID

  if (!id) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return NextResponse.json({ message: "Invalid Product ID" }, { status: 400 });
  }

  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex !== -1) {
    products = products.filter((p) => p.id !== productId);
    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  }

  return NextResponse.json({ message: "Product not found" }, { status: 404 });
}
