import {current, login, logout} from '../controllers/user';
import {Router} from "express";
import {body} from 'express-validator';
import {assignUserByToken} from "../middleware/routeSecurity";

const router = Router();

router.post(
    '/login',
    body('token')
        .isLength({
            min: 1000,
            max: 1300,
        }),
    login
);

router.post('/logout', logout);

router.get('/current', assignUserByToken, current);

export default router;