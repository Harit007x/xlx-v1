import { NextRequest, NextResponse } from 'next/server';
import { compare, hash } from 'bcrypt';
import * as z from "zod";
import { db } from '../../../db';

const userSchema = z.object({
    username: z.string()
        .min(1, 'Username is required')
        .min(4, 'Username must be at least 4 characters')
        .max(10),
    password: z.string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters').max(10),
})

export async function POST(req: NextRequest) {
    try{
        const body = new URLSearchParams(await req.text());
        const usernames:any = body.get('username');
        const passwords = body.get('password');

        const { username, password } = userSchema.parse({"username": usernames, "password": passwords});

        const userExists = await db.user.findUnique({
            where: { username: username }
        })

        if(!userExists){
            return NextResponse.json({data:{},  message: "Username or password is incorrect!", status:401 })
        }

        const passwordMatch = await compare(password, userExists.password);

        if(!passwordMatch){
            return NextResponse.json({data:{},  message: "Username or password is incorrect!", status:401 })
        }
        return NextResponse.json({data:userExists,  message: "User found." })

    }catch(err){
        return NextResponse.json({ message: "Something went wrong!" })
    }
}