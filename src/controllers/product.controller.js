const program = require("../config/commander.config.js");
const productService = require("../service/product.service.js");

const showProducts = async (req, res) => {
    const { title, page, limit } = req.params;
    try {
        const result = await productService.getAllProducts(title, page, limit);
        const products = result.docs.map((product) => product.toJSON());
        res.render("products", {
            products,
            result,
            port: program.opts().p,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const showOrganizedProducts = async (req, res) => {
    try {
        const productsOrdered = await productService.getOrganizedProducts();
        const products = productsOrdered.map((product) => product.toJSON());
        res.render("admin", {
            products,
            productsOrdered,
            port: program.opts().p,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const showAProduct = async (req, res) => {
    const { pid } = req.params;
    const role = req.cookies['role'];

    try {
        const foundProductById = await productService.getProductById(pid);
        if (!foundProductById) {
            return res.status(404).json("Produto não existe.");
        }
        res.render("product", {
            product: foundProductById,
            _id: foundProductById._id,
            title: foundProductById.title,
            category: foundProductById.category,
            description: foundProductById.description,
            price: foundProductById.price,
            thumbnail: foundProductById.thumbnail,
            stock: foundProductById.stock,
            code: foundProductById.code,
            isAdmin: role === "admin",
            isUser: role === "user",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const showProducysById = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productService.getProductById(pid);
        req.logger.debug(`O produto com id ${pid}, foi obtido.`);
        const resultProduct = [product].map((product) => product.toJSON());
        res.render("edit", { product: resultProduct[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status, category } = req.body;
        const productData = { title, description, price, thumbnail, code, stock, status, category };
        await productService.createProduct(productData);
        req.logger.debug(`O produto (${title}), foi criado com sucesso.`);
        return res.render("msgProduct");
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        await productService.deleteProduct(pid);
        req.logger.debug(`O produto com id ${pid} foi deletado.`);
        return res.status(200).json({ message: "Produto deletado com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    const { pid } = req.params;
    try {
        const productData = { title, description, price, thumbnail, code, stock, status, category };
        await productService.updateProduct(pid, productData);
        req.logger.debug(`Produto com id ${pid} foi atualizado com sucesso.`);
        return res.status(201).json({ message: "Produto atualizado com sucesso." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    showProducts,
    showAProduct,
    showOrganizedProducts,
    showProducysById,
    createProduct,
    deleteProduct,
    updateProduct,
};