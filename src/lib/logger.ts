import winston from "winston";
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
    level: process.env["LOG_LEVEL"] || "info",
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.File({
            filename: process.env["LOG_FILENAME"] || "/var/log/bf_web_app.log",
            maxsize: 5242880
        }),
    ],
});

export { logger };
