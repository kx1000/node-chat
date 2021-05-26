import {Router} from "express";
import {jwtLogin} from "../controllers/securityController";

const router = Router();

router.post('/jwt-login', jwtLogin);

export default router;