const express = require("express");
const validProduct = require("../middleware/validProduct.js");
const productController = require("../controllers/product.controller.js");

const router = express.Router();

router.get("/:title/:page/:limit", productController.showProducts);

router.get("/:pid", productController.showAProduct);

router.post("/", validProduct, productController.createProduct);

router.delete("/:pid", productController.deleteProduct);

router.put("/:pid", validProduct, productController.updateProduct);

module.exports = router;