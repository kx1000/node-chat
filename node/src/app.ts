import express from 'express';
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import messageRoutes from "./routes/message";
import userRoutes from "./routes/user";
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import corsOptions from "./utils/corsOptions";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

mongoose
    .connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(result => {
        const server = app.listen(process.env.PORT, () => {
            console.log(`Started: http://localhost:${process.env.PORT}`);
        });
        const io = new Server(server, {
            cors: corsOptions,
            allowEIO3: true
        });
        io.on('connect', socket => {
            console.log(`Connected`);
        })
    })
    .catch(err => console.log(err));