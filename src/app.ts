import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.get('/', function(req, res, next) {
    res.send('Hello World');
});

//mongoose.connect();

app.listen(3000);