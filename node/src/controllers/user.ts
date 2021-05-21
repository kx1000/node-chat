import express, { RequestHandler } from "express";
import googleAuth from "../utils/googleAuth";
import {validationResult} from "express-validator";

export const login: RequestHandler = (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const token = req.body.token;
    googleAuth
        .fetchPayload(token)
        .then(payload => {
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({
                name: payload.name,
                email: payload.email,
            });
        });
};

export const logout: RequestHandler = (req: express.Request, res: express.Response) => {
    res.clearCookie('token');
    res.sendStatus(200);
};

export const current: RequestHandler = (req: express.Request, res: express.Response) => {
    res.send(req.user);
};