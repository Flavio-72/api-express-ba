// src/models/productModel.js

class Product {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.category = data.category;
        this.price = data.price;
        this.stock = data.stock;
        this.imageUrl = data.imageUrl;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            category: this.category,
            price: this.price,
            stock: this.stock,
            imageUrl: this.imageUrl
        };
    }
}

export default Product;