import express, {RequestHandler} from "express";
import User, {UserDocument} from '../models/userModels';
import bcrypt from 'bcryptjs';
import googleAuth from "../utils/googleAuth";
import jwtCookie from "../utils/jwtCookie";

export const jwtLogin: RequestHandler = async (req: express.Request, res: express.Response) => {
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

        jwtCookie.setTokenCookieForUser(res, loadedUser);
        return res.json(loadedUser);
    } catch (err) {
        return res.sendStatus(500);
    }
};

export const googleLogin: RequestHandler = async (req: express.Request, res: express.Response) => {
    const googleUser = await googleAuth.fetchPayload(req.body.token);
    const loadedUser: UserDocument | null = await User.findOne({email: googleUser.email}).exec();
    if (loadedUser) {
        jwtCookie.setTokenCookieForUser(res, loadedUser);
        return res.status(200).json(loadedUser);
    }

    const newUser = await User.create({
        name: googleUser.name,
        email: googleUser.email,
    });
    jwtCookie.setTokenCookieForUser(res, newUser);
    return res.status(201).json(newUser);
};

export const logout: RequestHandler = (req: express.Request, res: express.Response) => {
    res.clearCookie('token');
    return res.sendStatus(200);
};