const fs = require("fs");

class ProductManager {
    #pathData;
    #products;
    #id = 0;

    constructor(path) {
        this.#pathData = path;
        this.#products = [];
    }

    #readFile = async () => {
        let result = await fs.promises.readFile(this.#pathData, "utf-8");
        const resultParsed = JSON.parse(result);
        return resultParsed;
    };

    #recordFile = async (data) => {
        await fs.promises.writeFile(this.#pathData, JSON.stringify(data));
    };

    getProducts = () => this.#products;

    createProduct = async ({ title, description, price, thumbnail, code, stock, status, category }) => {
        const resultParsedMessy = await this.#readFile();
        const resultParsed = resultParsedMessy.sort((a, b) => {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        });

        let id;
        if (!resultParsed.at(-1)) {
            id = 1;
        } else {
            id = resultParsed.at(-1).id + 1;
        }
        this.#id = id;

        const product = {
            id: this.#id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status,
            category,
        };

        resultParsed.push(product);

        await this.#recordFile(resultParsed);
        return product;
    };

    getProductsList = async () => {
        const products = await this.#readFile();
        return products;
    };

    getAllProducts = async (page, limit) => {
        try {
            const options = {
                page: page,
                limit: limit,
            };
            const resultParsed = await this.#readFile().paginate({}, options);
            return resultParsed;
        } catch (error) {
            req.logger.error("Erro ao paginar getAllProducts:", error);
        }
    };

    getProducts = async (title, page, limit) => {
        try {
            const options = {
                page: page,
                limit: limit,
                sort: { price: 1 },
            };
            const products = await this.#readFile().paginate({ title: title }, options);
            return products;
        } catch (error) {
            req.logger.error("Erro ao paginar getProducts:", error);
        }
    };

    getProductById = async (pid) => {
        const resultParsed = await this.#readFile();
        const index = resultParsed.findIndex((product) => product.id === pid);
        return resultParsed[index];
    };

    updateProduct = async ({ title, description, price, thumbnail, code, stock, status, category }, pid) => {
        const resultParsed = await this.#readFile();
        const index = resultParsed.findIndex((product) => product.id === +pid);

        const newProduct = {
            id: +pid,
            ...resultParsed[index],
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            status: status,
            category: category,
        };
        req.logger.debug(resultParsed[index]);
        resultParsed[index] = newProduct;

        await this.#recordFile(resultParsed);
        return resultParsed[index];
    };

    deleteProduct = async (pid) => {
        const resultParsed = await this.#readFile();
        const indexDelete = resultParsed.findIndex((product) => {
            return product.id === pid;
        });
        resultParsed.splice(indexDelete, 1);
        await this.#recordFile(resultParsed);
    };
}

module.exports = ProductManager;