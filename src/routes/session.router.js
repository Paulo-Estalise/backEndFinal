const express = require("express");
const passport = require("passport");
const sessionController = require("../controllers/session.controller.js");

const router = express.Router();

router.get(
    "/github",
    passport.authenticate('github', { scope: ['user:email'] }),
    sessionController.tokenGit
);

module.exports = router;