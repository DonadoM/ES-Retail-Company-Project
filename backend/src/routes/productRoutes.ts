import express from 'express';
import multer from 'multer';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();
const upload = multer();

router.post('/', upload.none(), createProduct);
router.get('/', getProducts);
router.put('/:id', upload.none(), updateProduct);
router.delete('/:id', deleteProduct);

export default router;

