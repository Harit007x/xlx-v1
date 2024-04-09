import { Server } from "socket.io";

const io = new Server(8000, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("connected user");

    socket.on("message", (message, room: string) => {
        if (room.length > 0) {
            io.to(room).emit("message", message);
        } else {
            io.emit("message", message);
        }
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });

    socket.on("joinRoom", (roomName: string) => {
        console.log("room =", roomName);
        socket.join(roomName);
    });
});
