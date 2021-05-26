import express, {RequestHandler} from "express";
import googleAuth from "../utils/googleAuth";
import User, {UserDocument} from '../models/userModels';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: UserDocument,
        }
    }
}

export const assignUserByToken: RequestHandler = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.verify(token, process.env.SECRET as string) as UserDocument;
        //const googleUser = await googleAuth.fetchPayload(token);

        const loadingUser: UserDocument | null = await User.findOne({email: decodedToken.email}).exec();
        if (loadingUser) {
            req.user = loadingUser;
            return next();
        }
        // req.user = await User.create({
        //     name: googleUser.name,
        //     email: googleUser.email,
        // });
        // return next();
    } catch (err) {
        res.sendStatus(401);
    }
}
