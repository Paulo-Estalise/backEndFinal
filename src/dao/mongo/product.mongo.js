const productModel = require("../../model/product.model.js");

const getProductsList = async () => {
    try {
        const products = await productModel.find({});
        return products;
    } catch (error) {
        console.error("Erro ao obter todos os produtos:", error);
    }
};

const getAllProducts = async (page, limit) => {
    try {
        const options = {
            page: page,
            limit: limit,
        };
        const products = await productModel.paginate({}, options);
        return products;
    } catch (error) {
        console.error("Erro ao paginar todos os produtos:", error);
    }
};

const getProducts = async (title, page, limit) => {
    try {
        const options = {
            page: page,
            limit: limit,
            sort: { price: 1 },
        };
        const products = await productModel.paginate({ title: title }, options);
        return products;
    } catch (error) {
        console.error("Erro ao paginar todos os produtos em ordem crescente de preço:", error);
    }
};

const getProductById = async (pid) => {
    try {
        const resultParsed = await productModel.find({});
        const index = resultParsed.findIndex((product) => product.id === pid);
        return resultParsed[index];
    } catch (error) {
        console.error("Erro ao obter todos os produtos pelo Id:", error);
    }
};

const createProduct = async ({ title, description, price, thumbnail, code, stock, status, category }) => {
    try {
        const productCreated = await productModel.create({ title, description, price, thumbnail, code, stock, status, category });
        return productCreated;
    } catch (error) {
        console.error("Erro ao criar o produto:", error);
    }
};

const deleteProduct = async (pid) => {
    try {
        const productDeleted = await productModel.deleteOne({ _id: pid });
        return productDeleted;
    } catch (error) {
        console.error("Erro ao deletar o produto:", error);
    }
};

const updateProduct = async ({ title, description, price, thumbnail, code, stock, status, category }, pid) => {
    try {
        const productUpdated = await productModel.updateOne(
            { _id: pid },
            { title, description, price, thumbnail, code, stock, status, category }
        );
        return productUpdated;
    } catch (error) {
        console.error("Erro ao atualizar o produto:", error);
    }
};

module.exports = {
    getProductsList,
    getAllProducts,
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
};