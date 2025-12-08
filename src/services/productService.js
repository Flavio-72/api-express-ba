import Product from '../models/productModel.js';
import db from '../config/firebaseConfig.js';

const productsCollection = db.collection('products');

class ProductService {

  static async createProduct(data) {
    const newProductData = {
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      category: data.category,
      imageUrl: data.imageUrl || []
    };

    const docRef = await productsCollection.add(newProductData);
    const newProduct = new Product({ id: docRef.id, ...newProductData });
    return newProduct.toJSON();
  }

  static async getAllProducts() {
    const snapshot = await productsCollection.get();
    const products = [];

    snapshot.forEach(doc => {
      const product = new Product({ id: doc.id, ...doc.data() });
      products.push(product.toJSON());
    });

    return products;
  }

  static async getProductById(id) {
    const doc = await productsCollection.doc(id).get();
    if (!doc.exists) return null;

    const product = new Product({ id: doc.id, ...doc.data() });
    return product.toJSON();
  }

  static async updateProduct(id, data) {
    const docRef = productsCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return null;

    const updateData = {};
    const { name, description, price, stock, category, imageUrl } = data;

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (category !== undefined) updateData.category = category;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    await docRef.update(updateData);

    const updatedDoc = await docRef.get();
    const product = new Product({ id: updatedDoc.id, ...updatedDoc.data() });
    return product.toJSON();
  }

  static async deleteProduct(id) {
    const docRef = productsCollection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return null;

    const product = new Product({ id: doc.id, ...doc.data() });
    await docRef.delete();

    return product.toJSON();
  }
}

export default ProductService;
