import { RequestHandler } from "express";
import googleAuth from "../utils/googleAuth";

export const login: RequestHandler = (req, res, next) => {
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