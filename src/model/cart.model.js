const mongoose = require('mongoose');

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Users", // Relaciona com a coleção de usuários
    },
    email: String,
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products" // Relaciona com a coleção de produtos esportivos
                },
                qty: Number // Quantidade do produto no carrinho
            }
        ],
        default: []
    }
});

cartSchema.pre("find", function () {
    this.populate("products.product"); // Preenche os detalhes do produto
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

module.exports = cartModel;
