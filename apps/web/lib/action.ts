'use server'

import { db } from '../db';

export async function getUserDetails(username?: string) {
   
    try {
        const user = await db.user.findUnique({
            where:{
            username: username
            }
        });
        return { data: user, message: 'User fetched.'}
    }  catch(e) {
        console.log(e);
    }
}