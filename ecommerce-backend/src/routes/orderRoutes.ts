import express from 'express';
import {
  getOrders,
//   getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController';

const router = express.Router();

// Define API routes for orders
router.get('/', getOrders); // Get all orders
// router.get('/:id', getOrderById); // Get order by ID
router.post('/', createOrder); // Create a new order
router.put('/:id', updateOrder); // Update an order by ID
router.delete('/:id', deleteOrder); // Delete an order by ID

export default router;
