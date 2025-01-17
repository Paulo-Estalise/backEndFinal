const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  delete user.password; // Remove a senha do objeto do usuário
  const token = jwt.sign(user, process.env.JWTPRIVATE_KEY); // Gera o token JWT
  return token;
};

module.exports = { generateToken };