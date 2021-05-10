import express from 'express';
import {mongoConnect} from './util/database';
import {Message} from './models/message';

const app = express();

app.get('/messages', function(req, res, next) {
    res.send('Hello World');
});

mongoConnect(() => {
    const message = new Message('hello world!');
    message.save();
    app.listen(3000);
});