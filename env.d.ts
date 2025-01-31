declare module NodeJS {
    interface ProcessEnv {
        MONGODB_URL: string;
        REDIS_HOST: string;
        REDIS_PORT: string;
        REDIS_USERNAME: string;
        REDIS_PASSWORD: string;
        AWS_ACCESS_KEY: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_BUCKET_NAME: string;
        AWS_BUCKET_REGION: string;
        AWS_BUCKET_IMAGE_URL_EXPIRATION: string;
        ACCESS_TOKEN_SECRET: string;
        REFRESH_TOKEN_SECRET: string;
        ACCESS_TOKEN_VALIDITY: string;
        REFRESH_TOKEN_VALIDITY: string;
        REFRESH_TOKEN_MAX_AGE: string;
        FRONTEND_DEV_URL: string;
        FRONTEND_PROD_URL: string;
        NODE_ENV: "development" | "production";
        PORT: string;
        LOG_LEVEL: string;
        ERROR_EXPOSURE_DEPTH: string;
    }
}
