import { Router } from 'express';
import ProductController from '../controllers/productController.js';

import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdmin.js';
import validateProduct from '../middlewares/validateProduct.js';

const router = Router();

router.post('/', authMiddleware, isAdmin, validateProduct, ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.put('/:id', authMiddleware, isAdmin, validateProduct, ProductController.updateProduct);
router.delete('/:id', authMiddleware, isAdmin, ProductController.deleteProduct);

export default router;
