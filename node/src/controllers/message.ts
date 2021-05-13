import { RequestHandler } from "express";

export const getMessages: RequestHandler = (req, res, next) => {
    res.status(200).json({
        info: "Hello world",
    });
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