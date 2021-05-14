import {RequestHandler} from "express";
import googleAuth from "./googleAuth";

declare global {
    namespace Express {
        interface Request {
            user?: object
        }
    }
}

export const checkAuthenticated: RequestHandler = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        req.user = await googleAuth.fetchPayload(token);
        next();
    } catch (err) {
        res.sendStatus(401);
    }
}
