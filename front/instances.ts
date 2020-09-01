import {setting} from "@settings";
import {Socket} from "net";

let socket: Socket;
import io from 'socket.io-client';

export const getSocket = (): Socket => {
    if (!socket) {
        socket = io(setting.IO);
    }
    return socket;
};