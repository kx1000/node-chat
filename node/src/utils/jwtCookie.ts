import express from "express";
import {UserDocument} from "../models/userModels";
import jwt from "jsonwebtoken";

export default {
    decodeUserFromToken(req: express.Request): UserDocument {
        const token = req.cookies.token;
        return jwt.verify(token, process.env.SECRET as string) as UserDocument;
    },
    setTokenCookieForUser(res: express.Response, user: UserDocument) {
        res.cookie(
            'token',
            jwt.sign({
                userId: user._id.toString(),
                email: user.email,
                name: user.name,
            }, process.env.SECRET as string),
            { httpOnly: true }
        );
    }
}