import mongoose, { type Connection } from "mongoose";
import chalk from "chalk";
import { getDBUrl, getCurrentEnv } from "@src/utils/env-info";
import logger from "@src/configs/logger.config";
import { type ConnectOptions } from "mongoose";

type Config = Record<ReturnType<typeof getCurrentEnv>, ConnectOptions>;

const mongoURL = getDBUrl();
const currentEnv = getCurrentEnv();

const dbConfig: Config = {
    development: {
        dbName: "developmentDB",
        bufferCommands: true,
        family: 4,
        maxPoolSize: 100,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        serverSelectionTimeoutMS: 5000,
    },
    production: {
        dbName: "productionDB",
        autoIndex: false,
        autoCreate: false,
        bufferCommands: false,
        family: 4,
        maxPoolSize: 100,
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        serverSelectionTimeoutMS: 30000,
    },
};

const mongoOptions = dbConfig[currentEnv];

mongoose.set("debug", currentEnv === "development");
mongoose.connect(mongoURL, mongoOptions);

const db: Connection = mongoose.connection;

db.on("connecting", () => {
    logger.info("database server: connecting...");
});

db.on("connected", () => {
    const { name, host, port, models } = db;

    logger.info("database server: successful...🍃");
    logger.debug(`database server: host: ${chalk.magenta("%s")}:${chalk.magenta("%s")}`, host, port);
    logger.debug(`database server: name: ${chalk.magenta("%s")}, models: ${chalk.grey("%o")}`, name, models);
});

db.on("open", () => {
    logger.info("database server: open...");
});

db.on("disconnecting", () => {
    logger.info("database server: disconnecting...");
});

db.on("disconnected", () => {
    logger.error("database server: disconnected...");
});

db.on("close", () => {
    logger.error("database server: closed...");
});

db.on("reconnected", () => {
    logger.info("database server: reconnected...");
});

db.on("error", () => {
    logger.error("database server: Unable to connect to Database...🙁");
    throw new Error("Unable to connect to Database");
});

process.on("SIGINT", () => {
    logger.error("database server: connection terminated...🟥");
    db.close();
});

export default db;
