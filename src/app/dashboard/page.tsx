// src/pages/dashboard/index.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

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
      const statsResponse = await fetch("/api/stats");
      const productsResponse = await fetch("/api/products");
      const ordersResponse = await fetch("/api/orders");

      const statsData = await statsResponse.json();
      const productsData = await productsResponse.json();
      const ordersData = await ordersResponse.json();

      setStats(statsData);
      setLatestProducts(productsData.slice(0, 5)); // Get latest 5 products
      setLatestOrders(ordersData.slice(0, 5)); // Get latest 5 orders
    };

    fetchDashboardData();
  }, []);

  const deleteOrder = async (id: number) => {
    const response = await fetch(`/api/orders?id=${id}`, { method: "DELETE" });

    if (response.ok) {
      // Refresh data or update the UI
      setLatestOrders(latestOrders.filter((order) => order.id !== id)); // Remove deleted order from state
      alert("Order deleted");
    } else {
      alert("Error deleting order");
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {stats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow-md text-center">
            <p className="text-lg font-semibold">Orders</p>
            <p className="text-2xl">{stats.ordersCount}</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md text-center">
            <p className="text-lg font-semibold">Products</p>
            <p className="text-2xl">{stats.productsCount}</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md text-center">
            <p className="text-lg font-semibold">Users</p>
            <p className="text-2xl">{stats.usersCount}</p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Latest Products</h2>
        <Table className="min-w-full bg-white shadow-md rounded">
          <TableHeader>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-100">
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Latest Orders</h2>
        <Table className="min-w-full bg-white shadow-md rounded">
          <TableHeader>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {latestOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-100">
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.createdAt}</TableCell>
                <TableCell>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
