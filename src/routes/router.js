const express = require("express");
const passport = require("passport");
const { validRoleAdmin, validRoleUser } = require("../middleware/validRole.js");
const { renderLogin, logout } = require("../controllers/user.controller.js");
const { showOrganizedProducts, showProductsById } = require("../controllers/product.controller.js");
const { renderMail } = require("../controllers/mail.controller.js");

const router = express.Router();

/**
 * Rota para exibir a página de login
 * Método: GET
 * Ação: Renderiza a página de login
 */
router.get("/", async (req, res, next) => {
    try {
        await renderLogin(req, res);
    } catch (error) {
        next(error); // Encaminha o erro para o middleware de tratamento de erros
    }
});

/**
 * Rota protegida para admin visualizar produtos organizados
 * Método: GET
 * Ação: Exibe produtos organizados (apenas admin)
 */
router.get(
    "/admin",
    passport.authenticate("jwt", { session: false }),
    validRoleAdmin,
    async (req, res, next) => {
        try {
            await showOrganizedProducts(req, res);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * Rota para logout
 * Método: GET
 * Ação: Realiza logout do usuário
 */
router.get("/logout", async (req, res, next) => {
    try {
        await logout(req, res);
    } catch (error) {
        next(error);
    }
});

/**
 * Rota para visualizar detalhes de um produto pelo ID
 * Método: GET
 * Ação: Exibe os detalhes de um produto específico
 */
router.get("/edit/:pid", async (req, res, next) => {
    try {
        await showProductsById(req, res);
    } catch (error) {
        next(error);
    }
});

/**
 * Rota protegida para admin acessar o recurso de e-mails
 * Método: GET
 * Ação: Renderiza a página de envio de e-mails (apenas admin)
 */
router.get(
    "/mail",
    passport.authenticate("jwt", { session: false }),
    validRoleAdmin,
    async (req, res, next) => {
        try {
            await renderMail(req, res);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
