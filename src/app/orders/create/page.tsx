// src/app/orders/create.tsx
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateOrder = () => {
  const [order, setOrder] = useState({
    customerName: '',
    totalAmount: 0,
    createdAt: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      router.push('/orders');
    } else {
      console.error('Failed to create order');
    }
  };

  return (
    <div>
      <h1>Create Order</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={order.customerName}
          onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
          placeholder="Customer Name"
        />
        <input
          type="number"
          value={order.totalAmount}
          onChange={(e) => setOrder({ ...order, totalAmount: Number(e.target.value) })}
          placeholder="Total Amount"
        />
        <input
          type="date"
          value={order.createdAt}
          onChange={(e) => setOrder({ ...order, createdAt: e.target.value })}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateOrder;
