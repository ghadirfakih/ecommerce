"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmationDialog from "../../components/ConfirmationDialog"; // Ensure you have this component

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null); // Optional error state
  const router = useRouter();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products"); // Replace with real API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  // Handle delete product
  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setShowConfirm(true);
  };

  // Confirm the delete action
  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        const response = await fetch(`/api/products/${productToDelete.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete the product");
        }

        setProducts(
          products.filter((product) => product.id !== productToDelete.id)
        );
        setShowConfirm(false);
        setProductToDelete(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to delete product. Please try again later.");
      }
    }
  };

  // Cancel the delete action
  const cancelDelete = () => {
    setShowConfirm(false);
    setProductToDelete(null);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <button
        onClick={() => router.push("/products/create")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Create Product
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Table className="min-w-full bg-white shadow-md rounded">
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="hover:bg-gray-100">
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <button
                  onClick={() => router.push(`/products/update/${product.id}`)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      {showConfirm && productToDelete && (
        <ConfirmationDialog
          message={`Are you sure you want to delete \"${productToDelete.name}\"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ProductList;
