import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import "@src/configs/cache.config";
import "@src/configs/db.config";

import morganMiddleware from "@src/middlewares/morgan.middleware";
import customErrorHandler from "@src/middlewares/custom-error-handler.middleware";
import defaultMiddleware from "@src/middlewares/default.middleware";
import api_v1 from "@src/api/v1";
import { getFrontendURL } from "@src/utils/env-info";

const app: express.Application = express();

const frontendURL = getFrontendURL();
const corsOptions = {
    origin: frontendURL,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/health-check", (_req: Request, res: Response) => {
    res.status(200).json({ message: "OK" });
});

app.use("/api/v1", api_v1);

app.use(defaultMiddleware);
app.use(customErrorHandler);

export default app;
