import ProductService from '../services/productService.js';
import asyncHandler from '../middlewares/asyncHandler.js';

class ProductController {

  static createProduct = asyncHandler(async (req, res) => {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json({
      success: true,
        message: 'Producto creado exitosamente',
      product});
  });

  static getAllProducts = asyncHandler(async (req, res) => {
    const products = await ProductService.getAllProducts();
    res.json(products);
  });

  static getProductById = asyncHandler(async (req, res) => {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  });

  static updateProduct = asyncHandler(async (req, res) => {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json({
      success: true,
        message: 'Producto actualizado exitosamente',
        product});
  });

  static deleteProduct = asyncHandler(async (req, res) => {
    const product = await ProductService.deleteProduct(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto a borrar no encontrado' });

    res.json({
      success: true,
        message: 'Producto borrado exitosamente',
        product}); 
  });
}

export default ProductController;
