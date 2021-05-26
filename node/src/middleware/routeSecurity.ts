import express, {RequestHandler} from "express";
import User, {UserDocument} from '../models/userModels';
import jwtCookie from "../utils/jwtCookie";

declare global {
    namespace Express {
        interface Request {
            user?: UserDocument,
        }
    }
}

export const assignUserByToken: RequestHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const userDataFromToken = jwtCookie.decodeUserFromToken(req);

        const loadedUser: UserDocument | null = await User.findOne({email: userDataFromToken.email}).exec();
        if (loadedUser) {
            req.user = loadedUser;
            return next();
        }
    } catch (err) {
        res.sendStatus(401);
    }
}
