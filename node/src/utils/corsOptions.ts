import * as dotenv from "dotenv";

dotenv.config();

export default {
    origin: process.env.FRONT_URL,
    credentials: true,
};