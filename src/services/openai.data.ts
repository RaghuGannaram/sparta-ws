import OpenAI from "openai";
import { catchAsyncDataError, processOPENAIError } from "@src/utils/application-errors";
import logger from "@src/configs/logger.config";

const completion = catchAsyncDataError(async (prompt: string): Promise<string> => {
    logger.debug(`openai.service: getting completion for prompt: %s`, prompt);

    const openai = new OpenAI();
    let response: OpenAI.Chat.Completions.ChatCompletion | undefined;
    try {
        response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: prompt }],
            store: true,
        });
    } catch (error) {
        processOPENAIError(error);
    }
    logger.debug(`openai.service: completion response: %o`, response);

    const reply: string | undefined = response?.choices?.[0]?.message?.content?.replace(/\s*\n\s*/g, " ").trim();

    return reply ?? "";
});

export default { completion };
