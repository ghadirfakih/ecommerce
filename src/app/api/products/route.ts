import { NextResponse } from 'next/server';

const products = [
  { id: 1, name: 'Product A', price: 20, description: 'Description A', createdAt: '2025-03-19' },
  { id: 2, name: 'Product B', price: 30, description: 'Description B', createdAt: '2025-03-18' },
];

// GET: Retrieve all products
export async function GET() {
  try {
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST: Create a new product
export async function POST(req: Request) {
  try {
    const { name, price, description } = await req.json();
    if (!name || !price || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newProduct = {
      id: products.length + 1,
      name,
      price,
      description,
      createdAt: new Date().toISOString(),
    };

    products.push(newProduct);
    return NextResponse.json(newProduct, { status: 201 }); // 201 - Created
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
