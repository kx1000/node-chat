import express from 'express';
import User from './models/user';
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import messageRoutes from "./routes/message";
import helmet from 'helmet';

dotenv.config();
const app = express();

app.use(express.json());

app.use(helmet());
app.use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Controll-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/messages', messageRoutes);

mongoose
    .connect(process.env.MONGO_URI as string, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(process.env.PORT, () => {
            console.log(`Started: http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err));