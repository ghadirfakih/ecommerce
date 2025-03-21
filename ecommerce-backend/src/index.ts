import express from 'express';
import orderRoutes from './routes/orderRoutes'; // Import the order routes
import productRoutes from './routes/productRoutes'; // Assuming you have a product routes file
// import userRoutes from './routes/userRoutes'; // Assuming you have a user routes file

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// Register routes
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
