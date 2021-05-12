import { getMessages, createMessage } from './../controllers/message';
import {Router} from "express";

const router = Router();

router.post('/', createMessage);

router.get('/', getMessages);

export default router;