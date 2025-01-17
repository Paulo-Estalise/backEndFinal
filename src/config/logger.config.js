const winston = require("winston");
require("dotenv").config();

const ENV = process.env.ENV;

const customLevelOptions = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
    },
    colors: {
        error: "red",
        warn: "magenta",
        info: "yellow",
        verbose: "green",
        debug: "cyan",
    },
};

const loggerDev = winston.createLogger({
    level: "debug",
    transports: [
        new winston.transports.Console({
            level: "debug",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                }),
            ),
        }),
    ],
});

const loggerProd = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize({ colors: customLevelOptions.colors }),
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                }),
            ),
        }),
        new winston.transports.File({
            filename: "./error.log",
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level}]: ${message}`;
                }),
            ),
        }),
    ],
});

const log = (req, res, next) => {
    if (ENV === "prod") {
        req.logger = loggerProd;
    } else {
        req.logger = loggerDev;
    }
    next();
};

module.exports = { log, loggerDev, loggerProd };
