const express = require("express");
const validUser = require("../middleware/validUser.js");
const passport = require("passport");
const userController = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/login", userController.login);

router.post(
    "/",
    passport.authenticate("register", { failureRedirect: "user/failregister" }),
    validUser,
    userController.createUser
);

router.get("/failregister", userController.failregister);

module.exports = router;