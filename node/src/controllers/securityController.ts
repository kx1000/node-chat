import express, {RequestHandler} from "express";
import User, {UserDocument} from '../models/userModels';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const jwtLogin: RequestHandler = async (req: express.Request, res: express.Response) => {
    const email = req.body.email;
    const plainPassword = req.body.plainPassword;
    try {
        const loadedUser: UserDocument | null = await User.findOne({ email: email });

        if (null === loadedUser) {
            return res.status(404).json({
                message: 'Email not found.',
            });
        } else if (
            undefined === loadedUser.password
            || !await bcrypt.compare(plainPassword, loadedUser.password)
        ) {
            return res.status(401).json({
                message: 'Email and password do not match.',
            });
        }

        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        }, 'secretStringToEnv');

        return res.json({ token: token });
    } catch (err) {
        return res.sendStatus(500);
    }
}