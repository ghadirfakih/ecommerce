"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ConfirmationDialog from '../../components/ConfirmationDialog'; // Ensure you have this component

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
        const response = await fetch('/api/products'); // Replace with real API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load products. Please try again later.');
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
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete the product');
        }

        setProducts(products.filter((product) => product.id !== productToDelete.id));
        setShowConfirm(false);
        setProductToDelete(null);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to delete product. Please try again later.');
      }
    }
  };

  // Cancel the delete action
  const cancelDelete = () => {
    setShowConfirm(false);
    setProductToDelete(null);
  };

  return (
    <div>
      <h1>Product Management</h1>
      <button onClick={() => router.push('/products/create')}>Create Product</button>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => router.push(`/products/update/${product.id}`)}>Edit</button>
                <button onClick={() => handleDelete(product)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      {showConfirm && productToDelete && (
        <ConfirmationDialog
          message={`Are you sure you want to delete "${productToDelete.name}"?`}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default ProductList;
