import express from 'express';
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import messageRoutes from "./routes/message";
import userRoutes from "./routes/user";
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());

app.use(helmet());
app.use(cors({
    origin: process.env.FRONT_URL,
    credentials: true,
}));
app.use(cookieParser());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

mongoose
    .connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(result => {
        app.listen(process.env.PORT, () => {
            console.log(`Started: http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => console.log(err));