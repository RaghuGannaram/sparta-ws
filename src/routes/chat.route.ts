import express, { type Router } from "express";
import chatController from "@src/controllers/chat.controller";
import authenticate from "@src/middlewares/auth.middleware";

const router: Router = express.Router();

router.get("/:chatId", authenticate, chatController.getChat);

router.post("/new", authenticate, chatController.createNewChat);

router.post("/update", authenticate, chatController.updateChat);

export default router;
