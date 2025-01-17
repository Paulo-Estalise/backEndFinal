const dao = require("../dao/factory.js");

const getCartByEmail = async (email) => {
    return await dao.dtoCart.findCartPopulate(email);
};

const createCart = async (email) => {
    return await dao.dtoCart.createCart(email);
};

const addProductToCart = async (pid, email) => {
    const cart = await dao.dtoCart.getCartByEmail(email);
    if (!cart) {
        throw new Error("Carrinho não encontrado.");
    }
    return await dao.dtoCart.addProductToCart(String(pid), email);
};

const updateCart = async (pid, email) => {
    const updatedCart = await dao.dtoCart.updateCart(pid, email);
    return updatedCart;
};

const filterProducts = (cart) => {
    const foundProducts = cart.products;
    const filteredProducts = foundProducts.filter(item => item.qty > 0);
    return filteredProducts.map(item => {
        const product = item.product;
        return {
            qty: item.qty,
            _id: product._id,
            thumbnail: product.thumbnail,
            description: product.description,
            price: product.price
        };
    });
};

module.exports = { getCartByEmail, createCart, addProductToCart, updateCart, filterProducts };