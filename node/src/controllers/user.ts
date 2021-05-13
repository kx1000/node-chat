import { RequestHandler } from "express";
import googleAuth from "../utils/googleAuth";

export const login: RequestHandler = (req, res, next) => {
    const token = req.body.token; // longer one :)
    googleAuth.fetchPayload(token).then(payload => console.log(payload));
};