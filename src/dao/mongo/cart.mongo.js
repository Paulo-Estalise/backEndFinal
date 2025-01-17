const cartModel = require("../../model/cart.model.js");
const userModel = require("../../model/user.model.js");

const conferAllCart = async () => {
    try {
        const resultInCart = await cartModel.find();
        return resultInCart;
    } catch (error) {
        console.error("Erro ao tentar ver todos os carrinhos", error);
    }
};

const getCartByEmail = async (email) => {
    try {
        const cart = await cartModel.findOne({ email });
        return cart;
    } catch (error) {
        console.error("Erro ao tentar obter o carrinho pelo e-mail", error);
    }
};

const createCart = async (email) => {
    try {
        const user = await userModel.findOne({ email }).exec();
        if (!user) {
            throw new Error("Usuário não encontrado com esse e-mail.");
        }
        let cart = await cartModel.create({
            users: user._id,
            email: email,
            products: [],
        });
        return cart;
    } catch (error) {
        console.error("Erro ao tentar criar o carrinho:", error);
        throw error;
    }
};

const addProductToCart = async (pid, email) => {
    try {
        let cart = await cartModel.findOne({ email });
        const idProductInCart = cart.products;
        const ifHaveProduct = idProductInCart.find(item => item.product.toString() === pid);
        if (ifHaveProduct) {
            const qty = ifHaveProduct.qty;
            ifHaveProduct.qty = qty + 1;
        } else {
            idProductInCart.push({ product: pid, qty: 1 });
        }
        await cart.save();
        return cart;
    } catch (error) {
        console.error("Erro ao tentar adicionar produto no carrinho", error);
    }
};

const updateCart = async (pid, email) => {
    try {
        let cart = await cartModel.findOne({ email });
        const idProductInCart = cart.products;
        const pidValue = pid.pid;
        const ifHaveProduct = idProductInCart.find(item => item.product.toString() === pidValue);

        const qty = ifHaveProduct.qty;

        if (ifHaveProduct && qty >= 1) {
            ifHaveProduct.qty = qty - 1;
            await cart.save();
        }
        if (ifHaveProduct && qty === 0) {
            await cartModel.updateOne(
                { _id: cart._id },
                { $pull: { products: { _id: ifHaveProduct._id } } }
            );
        }
        return cart;
    } catch (error) {
        console.error("Erro ao tentar atualizar carrinho", error);
    }
};

const findCartPopulate = async (email) => {
    try {
        const cart = await cartModel.findOne({ email }).populate("products.product");
        return cart;
    } catch (error) {
        console.error("Erro ao tentar popular o carrinho", error);
    }
};

module.exports = {
    conferAllCart,
    createCart,
    addProductToCart,
    getCartByEmail,
    updateCart,
    findCartPopulate,
};