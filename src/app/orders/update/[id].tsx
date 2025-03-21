"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Use useRouter instead of useParams

interface Order {
  id: number;
  customerName: string;
  totalAmount: number;
  createdAt: string;
}

const UpdateOrder = () => {
  const { id } =useParams(); // Use router.query to get the dynamic `id`
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the order details when the component mounts or the id changes
  useEffect(() => {
    if (!id) return; // Prevent running if `id` is not available yet
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
        setCustomerName(data.customerName);
        setTotalAmount(data.totalAmount.toString());
        setCreatedAt(data.createdAt);
      } else {
        console.error('Failed to fetch order details');
      }
      setLoading(false);
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedOrder),
    });

    if (response.ok) {
      router.push('/orders'); // Redirect to the orders page after updating
    } else {
      console.error('Failed to update order');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Update Order</h1>
      {order ? (
        <form onSubmit={handleUpdate}>
          <div>
            <label>Customer Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Total Amount</label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Created At</label>
            <input
              type="date"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Order</button>
        </form>
      ) : (
        <p>Order not found</p>
      )}
    </div>
  );
};

export default UpdateOrder;
