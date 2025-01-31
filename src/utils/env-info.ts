import { LogLevel, ErrorExposureDepth } from "@src/types/index";

export function getDBUrl(): string {
    return process.env["MONGODB_URL"];
}

export function getCacheParams(): { host: string; port: number; username: string; password: string } {
    return {
        host: process.env["REDIS_HOST"],
        port: Number(process.env["REDIS_PORT"]),
        username: process.env["REDIS_USERNAME"],
        password: process.env["REDIS_PASSWORD"],
    };
}

export function getAWSParams(): {
    accessKey: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
    signedURLValidity: string;
} {
    return {
        accessKey: process.env["AWS_ACCESS_KEY"],
        secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"],
        bucket: process.env["AWS_BUCKET_NAME"],
        region: process.env["AWS_BUCKET_REGION"],
        signedURLValidity: process.env["AWS_BUCKET_IMAGE_URL_EXPIRATION"],
    };
}

export function getJWTInfo(): {
    accessTokenSecret: string;
    refreshTokenSecret: string;
    accessTokenValidity: string;
    refreshTokenValidity: string;
    refreshTokenMaxAge: string;
} {
    return {
        accessTokenSecret: process.env["ACCESS_TOKEN_SECRET"],
        refreshTokenSecret: process.env["REFRESH_TOKEN_SECRET"],
        accessTokenValidity: process.env["ACCESS_TOKEN_VALIDITY"],
        refreshTokenValidity: process.env["REFRESH_TOKEN_VALIDITY"],
        refreshTokenMaxAge: process.env["REFRESH_TOKEN_MAX_AGE"],
    };
}

export function getFrontendURL(): string {
    const frontednDevURL = process.env["FRONTEND_DEV_URL"];
    const frontendProdURL = process.env["FRONTEND_PROD_URL"];

    return process.env["NODE_ENV"] === "production" ? frontendProdURL : frontednDevURL;
}

export function getCurrentEnv(): "development" | "production" {
    return process.env["NODE_ENV"] || "development";
}

export function getCurrentPort(): number {
    return Number(process.env["PORT"]) || 5000;
}

export function getLogLevel(): LogLevel {
    return (process.env["LOG_LEVEL"] as LogLevel) || LogLevel.INFO;
}

export function getErrorExposureDepth(): ErrorExposureDepth {
    return (process.env["ERROR_EXPOSURE_DEPTH"] as ErrorExposureDepth) || "BUSINESS";
}
