const program = require("../config/commander.config.js");
const userService = require("../service/user.service.js");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
        return res.status(400).render("msgConectedFail", {
            message: "E-mail e senha são obrigatórios.",
        });
    }

    try {
        const { user, accessToken } = await userService.loginUser(email, password);

        return res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60, // 1 hora
            })
            .cookie("role", user.role)
            .render("msgConected", {
                name: user.name,
                isAdmin: user.role === "admin",
                isUser: user.role === "user",
                port: program.opts().p,
            });
    } catch (error) {
        req.logger.info(`Erro no login: ${error.message}`);
        return res.status(400).render("msgConectedFail", {
            message: "E-mail ou senha inválidos.",
        });
    }
};

const renderLogin = (req, res) => {
    res.render("login");
};

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Validação básica
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Nome, e-mail e senha são obrigatórios." });
    }

    try {
        const accessToken = await userService.createUser({ name, email, password, role });
        req.logger.debug("Usuário criado com sucesso.");

        return res
            .cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60, // 1 hora
            })
            .cookie("role", role)
            .render("msgConected", {
                name: name,
                port: program.opts().p,
            });
    } catch (error) {
        req.logger.error(`Erro ao criar usuário: ${error.message}`);
        return res.status(500).json({ message: "Erro ao criar usuário." });
    }
};

const failregister = (req, res) => {
    res.render("msgUserExists", {
        message: "O e-mail já está em uso. Tente outro.",
    });
};

const logout = (req, res) => {
    res.clearCookie("connect.sid")
        .clearCookie("accessToken")
        .clearCookie("role")
        .render("msgLogout", {
            message: "Você foi desconectado com sucesso.",
        });
};

// Função para criptografar uma senha
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Gera um salt
  return await bcrypt.hash(password, salt); // Criptografa a senha
};

// Função para comparar uma senha com um hash
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword); // Compara a senha com o hash
};

module.exports = {
  login,
  renderLogin,
  createUser,
  failregister,
  logout,
  hashPassword,
  comparePassword,
};
