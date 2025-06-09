import express, { response } from 'express';
import dotenv from 'dotenv';
import DBConnection from './database/config.js'; // add .js extension for user-defined modules
import Product from './model/product.model.js';
import mongoose from 'mongoose';

dotenv.config(); // Load environment variables from .env file
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      products: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
      error: error.message,
    });
  }
});

app.post('/api/products', async (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.image) {
    return res.status(400).json({
      message: 'All fields are required: name, price, image',
    });
  }
  const newProduct = new Product(req.body);

  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      Product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating product',
      error: error.message,
    });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID',
    });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product',
      error: error.message,
    });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      sucess: false,
      message: 'Invalid product ID',
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product updated Successfully',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating product',
      error: error.message,
    });
  }
});

app.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      success: false,
      message: 'invalid product ID',
    });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      product: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product',
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  DBConnection(); // Connect to the database
  console.log('Server is running on port 3000');
});
