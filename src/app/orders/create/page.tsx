// src/app/orders/create.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateOrder = () => {
  const [order, setOrder] = useState({
    customerName: "",
    totalAmount: 0,
    createdAt: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      router.push("/orders");
    } else {
      console.error("Failed to create order");
    }
  };

  return (
    <div className=" min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Order</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
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
        <div className="mb-4">
          <input
            type="date"
            value={order.createdAt}
            onChange={(e) => setOrder({ ...order, createdAt: e.target.value })}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
