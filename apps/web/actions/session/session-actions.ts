'use server'
import { db } from "../../db";
import { GetReturnTypeSession, InputTypeSession, CreateReturnTypeSession, GetReturnTypeSingleSession } from "./types";
import { revalidatePath } from "next/cache";

export const createSession = async (data: InputTypeSession, user_id: number): Promise<CreateReturnTypeSession> => {

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
                is_chat_paused: false,
                is_ind_paused: false
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
        
        revalidatePath('/sessions')
        return { data: session, message: 'Session created successfully.'}
    }  catch(err) {
        console.log(err);
        return { error: 'Failed to schedule a session.' };
    }
}

export const getSingleSession = async (session_id: number): Promise<GetReturnTypeSingleSession> => {

    try {

        const session = await db.session.findUnique({
            where: {
                id: session_id
            }
        })

        if(!session){
            return {error: 'Sessions not found.'}
        }

        return { data: session, message: 'Session fetched successfully.'}
    }  catch(err) {
        console.log(err);
        return { error: 'Failed to fetch sessions.' };
    }
}

export const getSessionDetails = async (user_id: number): Promise<GetReturnTypeSession> => {

    try {

        const session = await db.session.findMany({
            where: {
                user_id: user_id
            }
        })

        if(!session){
            return {error: 'Sessions not found.'}
        }

        return { data: session, message: 'Sessions fetched successfully.'}
    }  catch(err) {
        console.log(err);
        return { error: 'Failed to fetch sessions.' };
    }
}

export const updateSession = async (data: InputTypeSession, session_id: number|undefined, user_id: number): Promise<any> => {
    try {
        const user = await db.user.findUnique({
            where: {
                id: user_id
            }
        });

        if (!user) {
            return { error: 'User not found.' }
        }

        const session = await db.session.findUnique({
            where: {
                id: session_id
            }
        });

        if (!session) {
            return { error: 'Session not found.' }
        }

        // Check if the user is the owner of the session
        if (session.user_id !== user.id) {
            return { error: 'User is not authorized to update this session.' }
        }

        const {
            name,
            description,
            schedule_date_time,
            is_auto,
            tags,
            password
        } = data

        const updatedSession = await db.session.update({
            where: {
                id: session_id
            },
            data: {
                name,
                description,
                schedule_date_time,
                is_auto,
                invitation_link: "asd",
                password,
                tags
            }
        })
        revalidatePath('/sessions')
        return { data: updatedSession, message: 'Session updated successfully.' }
    } catch (err) {
        console.log(err)
        return { error: 'Failed to update the session.' }
    }
}