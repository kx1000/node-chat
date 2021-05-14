import { getMessages, createMessage } from '../controllers/message';
import {Router} from "express";
import {checkAuthenticated} from "../utils/routeSecurity";

const router = Router();

router.post('/', checkAuthenticated, createMessage);

router.get('/', checkAuthenticated, getMessages);

export default router;