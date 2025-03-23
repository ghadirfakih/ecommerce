"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateOrder = () => {
  const [order, setOrder] = useState({
    orderId: "",  // Add orderId here
    productId: "",
    quantity: 0,
    status: "",
    customerName: "",
    totalAmount: 0,
    createdAt: "", // Automatically set this to current date on creation
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!order.orderId || !order.productId || !order.quantity || !order.status || !order.customerName || !order.totalAmount) {
      setError("All fields are required.");
      return;
    }

    if (order.quantity <= 0 || order.totalAmount <= 0) {
      setError("Quantity and Total Amount must be greater than zero.");
      return;
    }

    if (order.productId.length !== 5) {
      setError("Product ID must be 5 characters.");
      return;
    }

    setIsSubmitting(true);
    setError(null); 
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...order,
          createdAt: new Date().toISOString(), // Current timestamp
        }),
      });

      if (response.ok) {
        setOrder({
          orderId: "",
          productId: "",
          quantity: 0,
          status: "",
          customerName: "",
          totalAmount: 0,
          createdAt: "",
        });
        setSuccessMessage("Order created successfully!");
        setTimeout(() => router.push("/orders"), 2000);
      } else {
        const errorData = await response.json();
        setError(errorData?.message || "Failed to create order.");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Failed to create order.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Order</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <input
            type="text"
            value={order.orderId}
            onChange={(e) =>
              setOrder({ ...order, orderId: e.target.value })
            }
            placeholder="Order ID"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={order.productId}
            onChange={(e) =>
              setOrder({ ...order, productId: e.target.value })
            }
            placeholder="Product ID"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={order.quantity}
            onChange={(e) =>
              setOrder({ ...order, quantity: Number(e.target.value) })
            }
            placeholder="Quantity"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={order.status}
            onChange={(e) =>
              setOrder({ ...order, status: e.target.value })
            }
            placeholder="Status"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={order.customerName}
            onChange={(e) =>
              setOrder({ ...order, customerName: e.target.value })
            }
            placeholder="Customer Name"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={order.totalAmount}
            onChange={(e) =>
              setOrder({ ...order, totalAmount: Number(e.target.value) })
            }
            placeholder="Total Amount"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Order"}
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
