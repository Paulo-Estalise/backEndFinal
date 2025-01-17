const dao = require("../dao/factory.js");

const getAllProducts = async (title, page, limit) => {
    if (title === "all") {
        return await dao.dtoProduct.getAllProducts(page, limit);
    } else {
        return await dao.dtoProduct.getProducts(title, page, limit);
    }
};

const getOrganizedProducts = async () => {
    const result = await dao.dtoProduct.getProductsList();
    return result
        .sort((a, b) => a.code - b.code)
        .sort((a, b) => a.title.localeCompare(b.title));
};

const getProductById = async (pid) => {
    return await dao.dtoProduct.getProductById(String(pid));
};

const createProduct = async (productData) => {
    return await dao.dtoProduct.createProduct(productData);
};

const deleteProduct = async (pid) => {
    return await dao.dtoProduct.deleteProduct(String(pid));
};

const updateProduct = async (pid, productData) => {
    return await dao.dtoProduct.updateProduct(productData, pid);
};

module.exports = {
    getAllProducts,
    getOrganizedProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct,
};