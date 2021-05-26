import express, {RequestHandler} from "express";
import User, {UserDocument} from '../models/userModels';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {validationResult} from "express-validator";
import googleAuth from "../utils/googleAuth";

export const jwtLogin: RequestHandler = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const loadedUser: UserDocument | null = await User.findOne({ email: req.body.email });

        if (null === loadedUser) {
            return res.status(404).json({
                message: 'Email not found.',
            });
        } else if (
            undefined === loadedUser.password
            || !await bcrypt.compare(req.body.plainPassword, loadedUser.password)
        ) {
            return res.status(401).json({
                message: 'Email and password do not match.',
            });
        }

        console.log(process.env.SECRET);

        const token = jwt.sign({
            userId: loadedUser._id.toString(),
            email: loadedUser.email,
            name: loadedUser.name,
        }, process.env.SECRET as string);

        res.cookie('token', token, { httpOnly: true });
        return res.json({ token: token });
    } catch (err) {
        return res.sendStatus(500);
    }
};

export const googleLogin: RequestHandler = (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const token: string = req.body.token;
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

const authenticateUser = (user: UserDocument) => {

}