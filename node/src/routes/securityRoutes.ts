import {Router} from "express";
import {googleLogin, jwtLogin, logout} from "../controllers/securityController";
import {body} from "express-validator";
import bodyValidationExecutor from "../middleware/bodyValidationExecutor";

const router = Router();

router.post(
    '/jwt-login',
    [
        body('email')
            .isEmail(),
        body('plainPassword')
            .isLength({
                min: 6,
                max: 32,
            })
    ],
    bodyValidationExecutor.validate,
    jwtLogin
);

router.post(
    '/google-login',
    body('token')
        .isLength({
            min: 1000,
            max: 1300,
        }),
    bodyValidationExecutor.validate,
    googleLogin
);

router.post('/logout', logout);

export default router;