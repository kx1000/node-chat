import { RequestHandler } from "express";
import Message from "../models/message";
import socket from "../utils/socket";

export const getMessages: RequestHandler = async (req, res, next) => {
    const messages = await Message
        .find()
        .populate('userId');
    res.status(200).json(messages);
};

export const createMessage: RequestHandler = async (req, res, next) => {
    const content = req.body.content;
    const message = new Message({
        content: content,
        userId: req.user._id,
    });
    await message.save();
    socket.getIO().emit('postMessage', {
        content: content,
        userId: req.user,
    })
    res.status(201).json(message);
};