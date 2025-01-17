const express = require("express");
const mailController = require("../controllers/mail.controller.js");

const router = express.Router();

router.get("/", mailController.renderMail);

router.post("/", mailController.mail);

router.post("/whats", mailController.whats);

module.exports = router;