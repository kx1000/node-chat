import { RequestHandler } from "express";
import Message from "../models/message";

export const getMessages: RequestHandler = async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json(messages);
};

export const createMessage: RequestHandler = async (req, res, next) => {
    const content = req.body.content;
    const message = new Message({
        content: content
    });
    await message.save();
    res.status(201).json(message);
};