import { Request, Response } from 'express';
import { prisma } from '../../prisma/client'; // Assuming prisma client is set up

// Get all orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Get a specific order by ID
export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order by id:', error);
    res.status(500).json({ error: 'Error fetching order' });
  }
};

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  const { customerName, totalAmount, createdAt } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        customerName,
        totalAmount,
        createdAt: new Date(createdAt),
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Update an order
export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { customerName, totalAmount, createdAt } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        customerName,
        totalAmount,
        createdAt: new Date(createdAt),
      },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Error updating order' });
  }
};

// Delete an order
export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Error deleting order' });
  }
};
