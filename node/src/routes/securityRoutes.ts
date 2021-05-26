import {Router} from "express";
import {googleLogin, jwtLogin, logout} from "../controllers/securityController";
import {body} from "express-validator";

const router = Router();

router.post(
    '/jwt-login',
    body('token')
        .isLength({
            min: 300,
            max: 1300,
        }),
    jwtLogin
);

router.post(
    '/auth',
    body('token')
        .isLength({
            min: 1000,
            max: 1300,
        }),
    googleLogin
);

router.post('/logout', logout);

export default router;