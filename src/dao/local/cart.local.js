const fs = require("fs");

class CartManager {
    #pathData;
    #products;
    #cart;
    #id;

    constructor(path) {
        this.#pathData = path;
        this.#products = [];
        this.#cart = [];
    }

    #readCartFile = async () => {
        let result = await fs.promises.readFile(this.#pathData, "utf-8");
        const resultParsedInCart = JSON.parse(result);
        return resultParsedInCart;
    };

    #readProductsFile = async () => {
        //let resultProduct = await fs.promises.readFile("../../data/products.json", "utf-8");
        let resultProduct = await fs.promises.readFile("C:/Users/User/Downloads/CoderHouse/Back-End/projeto final/data/products.json", "utf-8");
        const resultParsed = JSON.parse(resultProduct);
        return resultParsed;
    };

    #recordCartFile = async (data) => {
        await fs.promises.writeFile(this.#pathData, JSON.stringify(data));
    };

    conferAllCart = async () => {
        const resultParsedInCart = await this.#readCartFile();
        return resultParsedInCart;
    };

    createCart = async () => {
        const resultParsedMessy = await this.#readCartFile();
        const resultParsedInCart = resultParsedMessy.sort((a, b) => {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        });

        let id;
        if (!resultParsedInCart.at(-1)) {
            id = 0;
        } else {
            id = resultParsedInCart.at(-1).id + 1;
        }
        this.#id = id;

        const cart = {
            id: this.#id,
            products: [],
        };

        resultParsedInCart.push(cart);

        await this.#recordCartFile(resultParsedInCart);
        return cart;
    };

    getCartById = async (cid) => {
        const resultParsedInCart = await this.#readCartFile();
        const index = resultParsedInCart.findIndex((cart) => cart.id === cid);
        return resultParsedInCart[index];
    };

    addProductToCart = async ({ pid, cid }) => {
        const resultParsedMessy = await this.#readCartFile();
        const resultParsedInCart = resultParsedMessy.sort((a, b) => {
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        });
        const allProducts = await this.#readProductsFile();
        const foundIdCart = resultParsedInCart[cid];
        const idSelectedProduct = allProducts[pid].id;
        //const nameProduct = allProducts[IdProduct].title;

        if (!foundIdCart || foundIdCart === -1) {
            let id;
            if (!resultParsedInCart.at(-1)) {
                id = 0;
            } else {
                id = resultParsedInCart.at(-1).id + 1;
            }
            this.#id = id;

            resultParsedInCart.push({
                id: this.#id,
                products: [{
                    productId: idSelectedProduct,
                    qty: 1,
                    //title: nameProduct
                }],
            });
        } else {
            const idProductInCart = foundIdCart.products;
            const ifHaveProduct = idProductInCart.findIndex(item => item.productId === pid);

            if (ifHaveProduct >= 0) {
                const sumItem = idProductInCart[ifHaveProduct].qty + 1;
                idProductInCart[ifHaveProduct].qty = sumItem;
            } else {
                idProductInCart.push({
                    productId: idSelectedProduct,
                    qty: 1,
                    //title: nameProduct
                });
            }
        }

        await this.#recordCartFile(resultParsedInCart);
        return resultParsedInCart;
    };
}

module.exports = CartManager;