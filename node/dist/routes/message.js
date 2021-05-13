"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("./../controllers/message");
const express_1 = require("express");
const router = express_1.Router();
router.post('/', message_1.createMessage);
router.get('/', message_1.getMessages);
exports.default = router;
