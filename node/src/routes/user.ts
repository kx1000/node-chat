import { login } from '../controllers/user';
import {Router} from "express";

const router = Router();

router.post('/login', login);

export default router;