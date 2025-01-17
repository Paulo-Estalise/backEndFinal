const bcrypt = require("bcryptjs");

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const isValidatePassword = (user, password) => {
    const valid = bcrypt.compareSync(password, user.password); // Corrigi a ordem dos parâmetros
    return valid;
};

module.exports = { createHash, isValidatePassword };