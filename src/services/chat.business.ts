import chatDataService from "@src/services/chat.data";
import openAIData from "@src/services/openai.data";
import { BusinessError, BusinessErrors, catchAsyncBusinessError } from "@src/utils/application-errors";
import logger from "@src/configs/logger.config";
import type { IAuthUser } from "@src/types";

const getChat = catchAsyncBusinessError(async function (authUser: IAuthUser, chatId: string) {
    logger.info(`chat.business: reading chat: %o`, chatId);

    const chat = await chatDataService.getChatRecord(chatId);

    if (!chat) throw new BusinessError(BusinessErrors.ENTITY_NOT_FOUND, "chat not found.");

    if (chat.user.id !== authUser.id)
        throw new BusinessError(BusinessErrors.UNAUTHORIZED_ACCESS, "you can only read your chat.");

    return chat;
});

const createNewChat = catchAsyncBusinessError(async function (authUser: IAuthUser, prompt: string) {
    logger.info(`chat.business: creating new chat for user: %o`, authUser);

    const chat = await chatDataService.createNewChatRecord(authUser.id);

    const reply = await openAIData.completion(prompt);

    const updatedChat = await chatDataService.updateChatRecord(chat.id, {
        prompt: prompt,
        reply: reply,
    });

    return updatedChat;
});

const updateChat = catchAsyncBusinessError(async function (authUser: IAuthUser, chatId: string, prompt: string) {
    logger.info(`chat.business: updating chat: %o`, chatId);

    const chat = await chatDataService.getChatRecord(chatId);

    if (!chat) throw new BusinessError(BusinessErrors.ENTITY_NOT_FOUND, "chat not found.");

    if (chat.user.id !== authUser.id)
        throw new BusinessError(BusinessErrors.UNAUTHORIZED_ACCESS, "you can only update your chat.");

    const reply = await openAIData.completion(prompt);

    const updatedChat = await chatDataService.updateChatRecord(chatId, {
        prompt: prompt,
        reply: reply,
    });

    return updatedChat;
});

export default { getChat, createNewChat, updateChat };
