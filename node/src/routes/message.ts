import { getMessages, createMessage } from '../controllers/message';
import {Router} from "express";
import {assignUserByToken} from "../utils/routeSecurity";

const router = Router();

router.post('/', assignUserByToken, createMessage);

router.get('/', assignUserByToken, getMessages);

export default router;