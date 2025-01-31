import { Schema, model, Document, Types } from "mongoose";

export interface ChatDocument extends Document {
    id: string;
    user: Types.ObjectId;
    title: string;
    messages: string[];
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema = new Schema<ChatDocument>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            default: "New Chat",
        },
        messages: [
            {
                type: String,
                default: [],
            },
        ],
    },
    {
        collection: "chatCollection",
        autoIndex: true,
        optimisticConcurrency: true,
        bufferTimeoutMS: 10000,
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret["id"] = ret["_id"].toHexString();
                delete ret["_id"];
                delete ret["__v"];
                delete ret["_doc"];
                return ret;
            },
        },
        toObject: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret["id"] = ret["_id"].toHexString();
                delete ret["_id"];
                delete ret["__v"];
                delete ret["_doc"];
                return ret;
            },
        },
    }
);

const ChatModel = model<ChatDocument>("Chat", chatSchema);

export default ChatModel;
