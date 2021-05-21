import express, { RequestHandler } from "express";
import Message from "../models/message";
import socket from "../utils/socket";

export const getMessages: RequestHandler = async (req: express.Request, res: express.Response) => {
    const messages = await Message
        .find()
        .sort([['createdAt', -1]])
        .populate('userId');
    res.status(200).json(messages);
};

export const createMessage: RequestHandler = async (req: express.Request, res: express.Response) => {
    const content = req.body.content;
    const message = new Message({
        content: content,
        userId: req.user._id,
        createdAt: new Date(),
    });
    await message.save();
    socket.getIO().emit('postMessage', {
        content: content,
        userId: req.user,
        createdAt: new Date(),
    })
    res.status(201).json(message);
};