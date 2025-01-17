const express = require("express");
const passport = require("passport");
const middleware = require("../middleware/validRole.js");
const cartController = require("../controllers/cart.controller.js");

const router = express.Router();

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    middleware.validRoleUser,
    cartController.productsCart
);

// Com fs
// router.get("/", cartController.productsInCart);

router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    cartController.addCart
);

router.put(
    "/remove/:pid",
    passport.authenticate("jwt", { session: false }),
    cartController.updateCart
);

// Com fs
// router.post("/", cartController.createCart);

// router.get("/:cid", cartController.getById);

// router.post("/:cid/product/:pid", cartController.addToCart);

module.exports = router;