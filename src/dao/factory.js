const cartDaoLocal = require("./local/cart.local.js");
const productDaoLocal = require("./local/product.local.js");
const cartDaoMongo = require("./mongo/cart.mongo.js");
const chatDaoMongo = require("./mongo/chat.mongo.js");
const productDaoMongo = require("./mongo/product.mongo.js");
const userDaoMongo = require("./mongo/user.mongo.js");
require('dotenv').config();

const persistence = process.env.PERSISTENCE;

let dtoCart;
let dtoProduct;
let dtoChat;
let dtoUser;

console.info("Persistencia:", persistence);

switch (persistence) {
    case "mongo":
        dtoCart = cartDaoMongo;
        dtoProduct = productDaoMongo;
        dtoChat = chatDaoMongo;
        dtoUser = userDaoMongo;
        break;
    case "local":
        dtoCart = cartDaoLocal;
        dtoProduct = productDaoLocal;
        break;
}

module.exports = { dtoCart, dtoProduct, dtoChat, dtoUser };