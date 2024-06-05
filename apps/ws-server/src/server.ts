import { Server } from "socket.io";
import prisma from '@repo/xlx';

const {db} = prisma


const io = new Server(8000, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("connected user");

    socket.on("message", async (message: string, room: string, user_id: number) => {
        console.log("server user =", user_id)
        let newMessageTemp = null
        try {
            const roomIns = await db.room.findUnique({
                where:{
                    room_code: room
                }
            })
            console.log("reached itsjbdasj")
            if(!roomIns){
                return {error: 'Room not found.'}
            }

            const createdMessage = await db.sessionMessages.create({
                data: {
                    message: message,
                    user_id: user_id,
                    room_id: roomIns?.id, // assuming room is the room_id, convert to int if it's a string
                },
            });

            const newMessage = await db.sessionMessages.findUnique({
                where:{
                    id: createdMessage.id,
                },
                include: {
                    user: {
                        select: {
                            first_name: true,
                            last_name: true
                        }
                    }
                }
            })

            if (newMessage && newMessage.user) {
                // @ts-ignore
                newMessage.initials = `${newMessage.user.first_name[0]}${newMessage.user.last_name[0]}`;
                // @ts-ignore
                newMessage.user_name = `${newMessage.user.first_name} ${newMessage.user.last_name}`;
            }
            newMessageTemp = newMessage

            console.log("Message stored in database", newMessage);
        } catch (error) {
            console.error("Error storing message in database:", error);
        }

        if (room.length > 0) {
            io.to(room).emit("message", newMessageTemp);
        } else {
            io.emit("message", message);
        }
    });

    socket.on("joinRoom", (room_id: string) => {
        console.log("joined room =", room_id);
        socket.join(room_id);
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});
