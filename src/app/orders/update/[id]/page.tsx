"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Use useRouter to access router.query

interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  createdAt: string;
}

const UpdateOrder = () => {
  const router = useRouter();
  const { id } =useParams(); // Use router.query to get the dynamic `id`
  const [order, setOrder] = useState<Order | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the order details when the component mounts or the id changes
  useEffect(() => {
    if (!id) return;
  
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) throw new Error("Failed to fetch order details");
  
        const data = await response.json();
        console.log("Fetched order data:", data);
  
        const orderData = data?.data;
        if (!orderData) throw new Error("Order data not found");
  
        setOrder(orderData);
        setCustomerName(orderData.customerName || "");
        setTotalAmount(orderData.totalAmount?.toString() || "");
        setCreatedAt(orderData.createdAt || "");
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching order:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrder();
  }, [id]);
  

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedOrder = {
      customerName,
      totalAmount: parseFloat(totalAmount),
      createdAt,
    };

    const response = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });

    if (response.ok) {
      router.push("/orders"); // Redirect to the orders page after updating
    } else {
      console.error("Failed to update order");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Update Order</h1>
      {order ? (
        <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Amount</label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Created At</label>
            <input
              type="date"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Order
          </button>
        </form>
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
};

export default UpdateOrder;
