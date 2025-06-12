import express, { response } from 'express';
import dotenv from 'dotenv';
import DBConnection from './database/config.js'; // add .js extension for user-defined modules
import productRoutes from './routes/product.js'; // add .js extension for user-defined modules

dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 3000; // Set the port from environment variable or default to 3000

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/products', productRoutes); // Use product routes
app.listen(PORT, () => {
  DBConnection(); // Connect to the database
  console.log('Server is running on port 3000');
});
