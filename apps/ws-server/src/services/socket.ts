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
        sub.subscribe("QUESTIONS");
        sub.subscribe("QUESTION-ACTION");
    }

    public eventListeners() {
        const io = this._io
        const {db} = prisma
        io.on("connection", (socket) => {
            console.log("connected user");

            socket.on("message", async (message: string, room: string, user_id: number) => {
                console.log("message event =", message, room, user_id)
                let new_message = null
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
        
                    const fetchedMessage = await db.sessionMessages.findUnique({
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
        
                    if (fetchedMessage && fetchedMessage.user) {
                        // @ts-ignore
                        fetchedMessage.initials = `${fetchedMessage.user.first_name[0]}${fetchedMessage.user.last_name[0]}`;
                        // @ts-ignore
                        fetchedMessage.user_name = `${fetchedMessage.user.first_name} ${fetchedMessage.user.last_name}`;
                    }
                    new_message = fetchedMessage
        
                    // console.log("Message stored in database", newMessage);
                } catch (error) {
                    console.error("Error storing message in database:", error);
                }

                if(new_message){
                    await pub.publish("MESSAGES", JSON.stringify({ room, message: new_message }));
                }
            });

            socket.on("question", async (question: string, room: string, user_id: number) => {
                console.log("question event =", question, room, user_id)
                let new_question = null
                try {
                    const fetched_room = await db.room.findUnique({
                        where:{
                            room_code: room
                        },
                    })
                    if(!fetched_room){
                        return {error: 'Room not found.'}
                    }
        
                    const createdQuestion = await db.questions.create({
                        data: {
                            question: question,
                            user_id: user_id,
                            room_id: fetched_room?.id,
                            up_vote_count: 0,
                            down_vote_count: 0
                        },
                    });
        
                    const fetchedQuestion = await db.questions.findUnique({
                        where:{
                            id: createdQuestion.id,
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
        
                    if (fetchedQuestion && fetchedQuestion.user) {
                        // @ts-ignore
                        fetchedQuestion.initials = `${fetchedQuestion.user.first_name[0]}${fetchedQuestion.user.last_name[0]}`;
                        // @ts-ignore
                        fetchedQuestion.user_name = `${fetchedQuestion.user.first_name} ${fetchedQuestion.user.last_name}`;
                    }
                    new_question = fetchedQuestion
        
                    // console.log("Message stored in database", newMessage);
                } catch (error) {
                    console.error("Error storing message in database:", error);
                }

                if(new_question){
                    console.log('re baba re baba =', new_question)
                    await pub.publish("QUESTIONS", JSON.stringify({ room, question: new_question }));
                }
            });

            socket.on("question-action", async (room:string, question_id: number, user_id: number, up_vote: boolean, down_vote: boolean) => {
                let updated_question = null
                try {

                    const currentQuestion = await db.questions.findUnique({
                        where: { id: question_id },
                        select: { up_vote_count: true, down_vote_count: true },
                    });
            
                    if (!currentQuestion) {
                        return { error: 'Question not found.' };
                    }
                    console.log("up =", up_vote, "down =", down_vote)

                    const updateData: any = {};
            
                    if (up_vote) {
                        updateData.up_vote_count = { increment: 1 };
                    }
            
                    if (down_vote) {
                        if (currentQuestion.up_vote_count > 0) {
                            updateData.up_vote_count = { decrement: 1 };
                        }
                    }
            
                    const updatedQuestion = await db.questions.update({
                        where: {
                            id: question_id
                        },
                        data: updateData
                    });
            
                    const existingAction = await db.questionActions.findUnique({
                        where: {
                            user_id_questions_id: {
                                user_id: user_id,
                                questions_id: question_id,
                            },
                        },
                    });
            
                    if (existingAction) {          
                        const updatedAction = await db.questionActions.update({
                            where: {
                                id: existingAction.id,
                            },
                            data: {
                                did_up_vote: up_vote,
                                did_down_vote: down_vote,
                            },
                        });
            
                    } else {
                        const newAction = await db.questionActions.create({
                            data: {
                                user_id: user_id,
                                questions_id: question_id,
                                did_up_vote: up_vote,
                                did_down_vote: down_vote,
                            },
                        });
                    }

                    const fetchedQuestion = await db.questions.findUnique({
                        where:{
                            id: question_id,
                        },
                        include: {
                            user: {
                                select: {
                                    first_name: true,
                                    last_name: true
                                }
                            },
                            questionaction:{
                                select: {
                                    user_id: true
                                }
                            }
                        },
                    })
        
                    if (fetchedQuestion && fetchedQuestion.user) {
                        // @ts-ignore
                        fetchedQuestion.initials = `${fetchedQuestion.user.first_name[0]}${fetchedQuestion.user.last_name[0]}`;
                        // @ts-ignore
                        fetchedQuestion.user_name = `${fetchedQuestion.user.first_name} ${fetchedQuestion.user.last_name}`;
                        // @ts-ignore
                        fetchedQuestion.is_disabled = fetchedQuestion.questionaction.some((action:any) => action.user_id === user_id);
                    }
                    updated_question = fetchedQuestion
                    console.log("got the data =", updated_question)

                } catch (err) {
                    console.log(err);
                }

                if(updated_question){
                    await pub.publish("QUESTION-ACTION", JSON.stringify({ room, question: updated_question }));
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

            if (channel === "QUESTIONS") {
                console.log("new question from redis", messageData);
                if (messageData.room.length > 0) {
                    io.to(messageData.room).emit("question", messageData.question);
                } else {
                    io.emit("question", messageData.question);
                }
            }

            if (channel === "QUESTION-ACTION") {
                console.log("updated question from redis", messageData);
                if (messageData.room.length > 0) {
                    io.to(messageData.room).emit("question-action", messageData.question);
                } else {
                    io.emit("question-action", messageData.question);
                }
            }


        });

    }

    get io() {
        return this._io;
      }
}

export default SocketService;