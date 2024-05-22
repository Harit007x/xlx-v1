'use server'

import { db } from "../../db";
import { InputTypeSession, ReturnTypeSession } from "./types";

export const createSession = async (data: InputTypeSession, user_id: number): Promise<ReturnTypeSession> => {

    try {

        const user = await db.user.findUnique({
            where: {
                id: user_id
            }
        })


        if(!user){
            return {error: 'User not found.'}
        }

        const {
            name,
            description,
            schedule_date_time,
            is_auto,
            tags,
            password
        } = data

        const room = await db.room.create({
            data: {
                name,
                is_chat_paused: false,  // default value
                is_ind_paused: false    // default value
            }
        });

        const session = await db.session.create({
            data: {
                name,
                description,
                schedule_date_time,
                is_auto,
                invitation_link: "asd",
                password,
                tags,
                user_id: user.id,
                room_id: room.id
            }
        });
        
        return { data: session, message: 'Session created successfully.'}
    }  catch(err) {
        console.log(err);
        return { error: 'Failed to signup.' };
    }
}