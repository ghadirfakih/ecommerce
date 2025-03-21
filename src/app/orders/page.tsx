'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  id: number;
  productId: number;
  quantity: number;
  status: string;
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders', { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', (error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    try {
      await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error('Failed to delete order:', (error as Error).message);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h1>Order Management</h1>
      <button onClick={() => router.push('/orders/create')}>Create Order</button>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.productId}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => router.push(`/orders/update/${order.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(order.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
