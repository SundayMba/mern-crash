import express from 'express';
import {
  getproducts,
  createProduct,
  updatedProduct,
  deleteProduct,
  getProductById,
} from '../controllers/product.js';

const router = express.Router();

router.get('/', getproducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.put('/:id', updatedProduct);
router.get('/:id', getProductById);

export default router;
