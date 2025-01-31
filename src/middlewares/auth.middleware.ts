import type { Request, Response, NextFunction } from "express";
import tokenDataService from "@src/services/token.data";
import { HttpError, HttpErrors } from "@src/utils/application-errors";
import catchAsyncError from "./catch-async-error.middleware";
import type { IAuthUser, IVerifiedRequest } from "@src/types";

const authenticate = catchAsyncError(async (req: Request, _res: Response, next: NextFunction) => {
    let accessToken = req.headers["authorization"];

    if (!accessToken) throw new HttpError(401, HttpErrors.UNAUTHORIZED, "Access token not provided.");

    if (!accessToken.startsWith("Bearer "))
        throw new HttpError(401, HttpErrors.UNAUTHORIZED, "Invalid authorization scheme.");

    accessToken = accessToken.slice(7);

    const decoded = await tokenDataService.validateAccessToken(accessToken);

    const user: IAuthUser = {
        id: decoded.id,
        fullname: decoded.fullname,
        handle: decoded.handle,
        email: decoded.email,
        role: decoded.role,
    };

    (req as IVerifiedRequest).user = user;

    next();
});

export default authenticate;
