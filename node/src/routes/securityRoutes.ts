import {Router} from "express";
import {jwtLogin} from "../controllers/securityController";

const router = Router();

router.post('/jwt-auth', jwtLogin);

export default router;