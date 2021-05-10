import {getDb} from '../util/database'

export class Message 
{
    body: String;

    constructor(body: String) {
        this.body = body;
    }

    async save() {
        const db = getDb();
        try {
            return await db.collection('messages').insertOne(this);
        } catch (err) {
            console.log(err);
        }
    }
}