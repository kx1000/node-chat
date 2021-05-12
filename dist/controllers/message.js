"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = exports.getMessages = void 0;
const getMessages = (req, res, next) => {
    res.status(200).json({
        info: "Hello world",
    });
};
exports.getMessages = getMessages;
const createMessage = (req, res, next) => {
    const content = req.body.content;
    res.status(201).json({
        info: "Created successfully!",
        message: {
            id: new Date().toString(),
            content: content,
        }
    });
};
exports.createMessage = createMessage;
