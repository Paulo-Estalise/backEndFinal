const validRoleAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        return next();
    }
    return res.status(403).send({ error: "Access denied" });
};

const validRoleUser = (req, res, next) => {
    if (req.user.role === "user") {
        return next();
    }
    return res.status(403).send({ error: "Access denied" });
};

module.exports = { validRoleAdmin, validRoleUser };
