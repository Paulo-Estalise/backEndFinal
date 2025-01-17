const bcrypt = require("bcryptjs");
const { generateToken } = require("../config/jsonwebtoken.config.js");
const dao = require("../dao/factory.js");

const loginUser = async (email, password) => {
    if (!email || !password) {
        throw new Error("Email e senha são obrigatórios.");
    }

    let user = await dao.dtoUser.getUsersByEmail(email);
    if (!user) {
        throw new Error(`Usuário com email ${email} não foi encontrado.`);
    }

    // Certifique-se de que o usuário é convertido corretamente para JSON, se necessário
    user = typeof user.toJSON === "function" ? user.toJSON() : user;

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Senha inválida.");
    }

    const accessToken = generateToken(user);
    return { user, accessToken };
};

const createUser = async (userData) => {
    if (!userData || !userData.email || !userData.password) {
        throw new Error("Dados do usuário incompletos.");
    }

    // Criptografar a senha antes de salvar
    userData.password = bcrypt.hashSync(userData.password, 10);

    // Salvar o usuário no banco de dados
    const newUser = await dao.dtoUser.createUser(userData);

    // Gerar token de acesso para o novo usuário
    const accessToken = generateToken(newUser);
    return { user: newUser, accessToken };
};

const logoutUser = () => {
    return { message: "Usuário deslogado com sucesso." };
};

module.exports = { loginUser, createUser, logoutUser };
