const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    try {
        req.logger.error("log de erro");
        req.logger.warn("log de aviso");
        req.logger.info("log de informação");
        req.logger.verbose("log detalhado");
        req.logger.debug("log de depuração");

        return res.status(200)
            .send({ message: "Todos os logs foram registrados com sucesso." });
    } catch (error) {
        return res.status(500)
            .send({ message: `Erro ao registrar os logs: ${error.message}` });
    }
});

module.exports = router;