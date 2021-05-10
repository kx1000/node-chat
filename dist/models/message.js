"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const database_1 = require("../util/database");
class Message {
    constructor(body) {
        this.body = body;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = database_1.getDb();
            try {
                return yield db.collection('messages').insertOne(this);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.Message = Message;
