import {RequestHandler} from "express";
import googleAuth from "../utils/googleAuth";
import User from '../models/user';

declare global {
    namespace Express {
        interface Request {
            user?: any,
        }
    }
}

export const assignUserByToken: RequestHandler = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const googleUser = await googleAuth.fetchPayload(token);

        const existingUser = await User.findOne({email: googleUser.email}).exec();
        if (existingUser) {
            req.user = existingUser;
            return next();
        }

        const newUser = new User({
            name: googleUser.name,
            email: googleUser.email,
        });

        req.user = await newUser.save();
        return next();
    } catch (err) {
        res.sendStatus(401);
    }
}
