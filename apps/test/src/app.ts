import http from "http";
import SocketService from "./services/socket";
import 'dotenv/config';

const socketService = new SocketService();

const httpServer = http.createServer();
console.log('port =', process.env.PORT);
const PORT = process.env.PORT ? process.env.PORT : 8000;

socketService.io.attach(httpServer);

httpServer.listen(PORT, () => {
    console.log(`HTTP Server listening on port ${PORT}`);
});

socketService.eventListeners();
