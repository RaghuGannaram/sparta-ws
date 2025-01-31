import { createClient, type RedisClientType } from "redis";
import logger from "@src/configs/logger.config";
import chalk from "chalk";
import { getCacheParams } from "@src/utils/env-info";

const { host, port, username, password } = getCacheParams();

const client: RedisClientType = createClient({
    socket: {
        host,
        port,
    },
    username,
    password,
});

client.connect();

client.on("connect", () => {
    logger.info("cache server: connecting...");
    logger.debug(`cache server: connected to client : ${chalk.magenta("%s")}`, host);
});

client.on("ready", () => {
    logger.info("cache server: connected...🚗");
});

client.on("error", (err) => {
    logger.error("cache server: error %o", err);
});

client.on("reconnecting", () => {
    logger.warn("cache server: reconnecting...");
});

client.on("end", () => {
    logger.warn("cache server: ended...");
});

process.on("SIGINT", () => {
    logger.error("cache server: connection terminated...🟥");
    client.quit();
});

export default client;
