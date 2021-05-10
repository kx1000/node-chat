"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./util/database");
const message_1 = require("./models/message");
const app = express_1.default();
app.get('/', function (req, res, next) {
    res.send('Hello World');
});
database_1.mongoConnect(() => {
    const message = new message_1.Message('hello world!');
    message.save();
    app.listen(3000);
});
