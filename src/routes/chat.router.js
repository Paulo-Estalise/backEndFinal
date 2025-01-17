const express = require("express");
const passport = require("passport");
const chatController = require("../controllers/chat.controller.js");
const middleware = require("../middleware/validRole.js");

const router = express.Router();

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    middleware.validRoleUser,
    chatController.renderChat
);

router.post("/", chatController.msgChat);

module.exports = router;