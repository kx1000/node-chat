import * as dotenv from 'dotenv';
import mongodb from 'mongodb';

dotenv.config();
const mongoUri: string = process.env.MONGO_URI as string;

const MongoClient = mongodb.MongoClient;
let _db: mongodb.Db;

export const mongoConnect = (callback: () => void) => {
    MongoClient
    .connect(mongoUri)
    .then(client => {
        console.log('Connected!');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}

export const getDb = () => {
    return _db;
}