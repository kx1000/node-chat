import express, { RequestHandler } from "express";
import googleAuth from "../utils/googleAuth";
import {validationResult} from "express-validator";
import User from "../models/userModels";
import bcrypt from 'bcryptjs';
import {Error} from "mongoose";
import {MongoError} from "mongodb";

export const login: RequestHandler = (req: express.Request, res: express.Response) => {
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

export const current: RequestHandler = (req: express.Request, res: express.Response) => {
    res.send(req.user);
};

export const create: RequestHandler = async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        return res.status(201).send(
            await User.create({
                email: req.body.email,
                password: await bcrypt.hash(req.body.plainPassword, 12),
                name: req.body.name,
            })
        );
    } catch (err) {
        if (err instanceof Error.ValidationError) {
            return res.status(422).send(err);
        } else if (err instanceof MongoError && err.message.includes('duplicate key error')) {
            return res.status(422).send({ message: "Duplicated email." });
        }
        return res.sendStatus(422);
    }
};