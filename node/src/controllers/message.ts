import { RequestHandler } from "express";
import Message from "../models/message";

export const getMessages: RequestHandler = async (req, res, next) => {
    const messages = await Message.find();
    res.status(200).json(messages);
};

export const createMessage: RequestHandler = (req, res, next) => {
    const content = req.body.content;

    res.status(201).json({
        info: "Created successfully!",
        message: {
            id: new Date().toString(),
            content: content,
        }
    });
};