// src/pages/dashboard/index.tsx
"use client";

import { useState, useEffect } from 'react';

interface Stats {
  ordersCount: number;
  productsCount: number;
  usersCount: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  createdAt: string;
}

interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  createdAt: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [latestOrders, setLatestOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const statsResponse = await fetch('/api/stats');
      const productsResponse = await fetch('/api/products');
      const ordersResponse = await fetch('/api/orders');

      const statsData = await statsResponse.json();
      const productsData = await productsResponse.json();
      const ordersData = await ordersResponse.json();

      setStats(statsData);
      setLatestProducts(productsData.slice(0, 5));  // Get latest 5 products
      setLatestOrders(ordersData.slice(0, 5));  // Get latest 5 orders
    };

    fetchDashboardData();
  }, []);

  const deleteOrder = async (id: number) => {
    const response = await fetch(`/api/orders?id=${id}`, { method: 'DELETE' });

    if (response.ok) {
      // Refresh data or update the UI
      setLatestOrders(latestOrders.filter(order => order.id !== id)); // Remove deleted order from state
      alert('Order deleted');
    } else {
      alert('Error deleting order');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {stats && (
        <div className="stats-cards">
          <div className="card">Orders: {stats.ordersCount}</div>
          <div className="card">Products: {stats.productsCount}</div>
          <div className="card">Users: {stats.usersCount}</div>
        </div>
      )}

      <div className="tables">
        <h2>Latest Products</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {latestProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Latest Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.customerName}</td>
                <td>{order.totalAmount}</td>
                <td>{order.createdAt}</td>
                <td>
                  <button onClick={() => deleteOrder(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
