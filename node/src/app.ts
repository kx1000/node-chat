import express from 'express';
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsOptions from "./utils/corsOptions";
import socket from "./utils/socket";
import securityRoutes from "./routes/securityRoutes";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use('/security', securityRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

mongoose
    .connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(result => {
        const server = app.listen(process.env.PORT, () => {
            console.log(`Started: http://localhost:${process.env.PORT}`);
        });
        const io = socket.init(server);
        io.on('connect', socket => {
            console.log(`Connected`);
        })
    })
    .catch(err => console.log(err));