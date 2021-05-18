import {Server} from "socket.io";
import * as http from "http";
import corsOptions from "./corsOptions";

let io;

export default {
    init(httpServer: http.Server): Server {
        io = new Server(httpServer, {
            cors: corsOptions,
            allowEIO3: true
        });

        return io;
    }
}