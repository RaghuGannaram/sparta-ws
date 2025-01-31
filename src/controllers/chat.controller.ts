import type { Request, Response } from "express";
import chatBusinessService from "@src/services/chat.business";
import catchAsyncError from "@src/middlewares/catch-async-error.middleware";
import type { IController, IVerifiedRequest } from "@src/types";
import { HttpError, HttpErrors } from "@src/utils/application-errors";

const getChat: IController = catchAsyncError(async function (req: Request, res: Response) {
    const { chatId } = req.params;

    if (!chatId) throw new HttpError(400, HttpErrors.BAD_REQUEST, "chatId is required.");

    const authUser = (req as IVerifiedRequest).user;

    const chat = await chatBusinessService.getChat(authUser, chatId);

    res.json({
        chat: chat,
    });
});

const createNewChat: IController = catchAsyncError(async function (req: Request, res: Response) {
    const { prompt } = req.body;

    if (!prompt) throw new HttpError(400, HttpErrors.BAD_REQUEST, "prompt is required.");

    if (prompt.length > 1000) throw new HttpError(400, HttpErrors.BAD_REQUEST, "prompt is too long.");

    const authUser = (req as IVerifiedRequest).user;

    const chat = await chatBusinessService.createNewChat(authUser, prompt);

    res.json({
        chat: chat,
    });
});

const updateChat: IController = catchAsyncError(async function (req: Request, res: Response) {
    const { chatId, prompt } = req.body;

    if (!chatId || !prompt) throw new HttpError(400, HttpErrors.BAD_REQUEST, "chatId and prompt are required.");

    if (prompt.length > 1000) throw new HttpError(400, HttpErrors.BAD_REQUEST, "prompt is too long.");

    const authUser = (req as IVerifiedRequest).user;

    const chat = await chatBusinessService.updateChat(authUser, chatId, prompt);

    res.json({
        chat: chat,
    });
});

export default { getChat, createNewChat, updateChat };
