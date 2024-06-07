import { Server } from "socket.io";
import prisma from '@repo/xlx'
import {Redis} from "ioredis";

const pub = new Redis({
    host: "localhost",
    port: 6379,
    username: "default",
    password: "",
  });
  
const sub = new Redis({
    host: "localhost",
    port: 6379,
    username: "",
    password: "",
  });
  
class SocketService {
    private _io: Server
    constructor() {
        this._io = new Server({
            cors:{
                allowedHeaders: ["*"],
                origin: "http://localhost:3000",
            }
        })
        sub.subscribe("MESSAGES");
    }

    public eventListeners() {
        const io = this._io
        const {db} = prisma
        console.log
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
        
                    // console.log("Message stored in database", newMessage);
                } catch (error) {
                    console.error("Error storing message in database:", error);
                }

                if(newMessageTemp){
                    await pub.publish("MESSAGES", JSON.stringify({ room, message: newMessageTemp }));
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

        sub.on("message", async (channel, data) => {
            const messageData = JSON.parse(data);
            if (channel === "MESSAGES") {
                console.log("new message from redis", messageData);
                if (messageData.room.length > 0) {
                    io.to(messageData.room).emit("message", messageData.message);
                } else {
                    io.emit("message", messageData.message);
                }
            }
        });

    }

    get io() {
        return this._io;
      }
}

export default SocketService;