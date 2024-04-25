'use server'

import { db } from "../../db";
import { InputTypeRegisterUser } from "./types";
import { hash } from 'bcrypt';

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

export async function createUser(data: InputTypeRegisterUser) {
   
    try {
        const userExists = await db.user.findUnique({
            where: {
                username: data.username
            }
        })

        if(userExists){
            return {data: {}, message: '', error: 'Username is already taken.'}
        }

        const {username, password, first_name, last_name} = data
        const hashedPassword = await hash(password, 10);

        const user = await db.user.create({
            data: {
                username,
                first_name,
                last_name,
                password: hashedPassword,
                email: username
            }
        });
        
        return { data: user, message: 'User fetched.'}
    }  catch(e) {
        console.log(e);
    }
}