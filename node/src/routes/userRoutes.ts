import {create, current} from '../controllers/userController';
import {Router} from "express";
import {body} from 'express-validator';
import {assignUserByToken} from "../middleware/routeSecurity";

const router = Router();

router.get('/current', assignUserByToken, current);

router.post(
    '',
    [
        body('email').isEmail()
            .withMessage('Invalid email.'),
        body('plainPassword')
            .exists()
            .withMessage('Password cannot be blank.')
            .isLength({
                min: 6,
                max: 32,
            })
            .withMessage('Password length must be between 6 and 32 chars.')
    ],
    create
);

export default router;