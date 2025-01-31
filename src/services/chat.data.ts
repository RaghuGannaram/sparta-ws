import ChatModel, { type ChatDocument } from "@src/models/Chat.model";
import { DataError, DataErrors, processMongoError, catchAsyncDataError } from "@src/utils/application-errors";
import logger from "@src/configs/logger.config";

const getChatRecord = catchAsyncDataError(async function (chatId: string): Promise<any> {
    logger.debug(`chat.data: reading messages of chat: %o`, chatId);

    let chatDoc: ChatDocument | null = null;

    try {
        chatDoc = await ChatModel.findById(chatId).populate({
            path: "user",
            select: "fullname handle",
        });
    } catch (error) {
        processMongoError(error);
    }

    if (!chatDoc) throw new DataError(DataErrors.DB_RECORD_NOT_FOUND, "chat not found.");

    return chatDoc.toObject();
});

const createNewChatRecord = catchAsyncDataError(async function (userId: string): Promise<any> {
    logger.debug(`chat.data: creating new chat for user: %o`, userId);

    let newChatDoc: ChatDocument | null = null;

    try {
        const newChatInstance = new ChatModel({ user: userId });
        newChatDoc = await newChatInstance.save();
    } catch (error) {
        processMongoError(error);
    }

    if (!newChatDoc) throw new DataError(DataErrors.DB_WRITE_OPERATION_FAILED, "chat creation failed.");

    const createdChatDoc = await ChatModel.findById(newChatDoc.id).populate({
        path: "user",
        select: "fullname handle",
    });

    if (!createdChatDoc) throw new DataError(DataErrors.DB_WRITE_OPERATION_FAILED, "chat creation failed.");

    return createdChatDoc.toObject();
});

const updateChatRecord = catchAsyncDataError(async function (
    chatId: string,
    data: { prompt: string; reply: string }
): Promise<any> {
    logger.debug(`chat.data: updating chat: %o`, chatId);

    let chatDoc: ChatDocument | null = null;

    try {
        chatDoc = await ChatModel.findByIdAndUpdate(
            chatId,
            { $push: { messages: [`prompt-${data.prompt}`, `reply-${data.reply}`] } },
            { new: true }
        ).populate({
            path: "user",
            select: "fullname handle",
        });
    } catch (error) {
        processMongoError(error);
    }

    if (!chatDoc) throw new DataError(DataErrors.DB_WRITE_OPERATION_FAILED, "chat update failed.");

    return chatDoc.toObject();
});

export default { getChatRecord, createNewChatRecord, updateChatRecord };
