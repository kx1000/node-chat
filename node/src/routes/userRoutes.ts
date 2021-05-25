import {create, current, login, logout} from '../controllers/userController';
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

router.post(
    '',
    [
        body('email').isEmail()
            .withMessage('Invalid email.'),
        body('plainPassword')
            .isString()
            .withMessage('Password must be a string.')
            .isLength({
                min: 6,
                max: 32,
            })
            .withMessage('Password length must be between 6 and 32 chars.')
    ],
    create
);

export default router;