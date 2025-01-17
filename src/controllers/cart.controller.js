const program = require("../config/commander.config.js");
const cartService = require("../services/cart.service.js");

const productsCart = async (req, res) => {
    const email = req.user.email;
    try {
        const foundCart = await cartService.getCartByEmail(email);
        req.logger.debug("Carrinho populado com sucesso");

        if (!foundCart) {
            req.logger.debug("Carrinho vazio");
            return res.render("msgEmptyCart");
        }

        const products = cartService.filterProducts(foundCart);

        return res.status(200).render("cart", {
            email: req.user.email,
            name: req.user.name,
            products,
            port: program.opts().p
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const addCart = async (req, res) => {
    const pid = req.body.pid;
    const email = req.user.email;

    try {
        let cart = await cartService.getCartByEmail(email);
        if (!cart) {
            req.logger.debug(`Carrinho não existe e será criado para o e-mail ${email}.`);
            cart = await cartService.createCart(email);
        }

        const addProduct = await cartService.addProductToCart(pid, email);
        req.logger.debug(`O produto com id ${pid} foi anexado no carrinho de ${email}`);

        const products = cartService.filterProducts(addProduct);

        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateCart = async (req, res) => {
    const pid = req.params;
    const email = req.user.email;

    try {
        const updatedCart = await cartService.updateCart(pid, email);
        req.logger.debug(`O carrinho de ${email} foi atualizado com sucesso`);

        const foundCart = await cartService.getCartByEmail(email);
        const products = cartService.filterProducts(foundCart);

        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { productsCart, addCart, updateCart };