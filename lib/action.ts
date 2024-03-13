'use server'

import { redirect } from 'next/navigation';
import { client } from "@/db";

export async function createUser(username: string, password: string) {
   
    console.log("called API")
    try {
        const user = await client.user.create({
            data: {
                username: username,
                password: password
            }
        });
        return { message: 'User Created.' };
    } catch (error) {
        return { error: error }
    }finally{
    }
}