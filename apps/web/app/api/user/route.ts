import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
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
        const body = await req.json();

        try{
            userSchema.parse(body);
        }catch(validationError:any){
            const errorDetails = JSON.parse(validationError.message); // Parse JSON string
            const errorMessage = errorDetails[0].message;
            return NextResponse.json({message: errorMessage})
        }

        const userExists = await db.user.findUnique({
            where: {
                username: body.username
            }
        })

        if(userExists){
            return NextResponse.json({ message: "Username already exists." })
        }

        const {username, password} = body
        const hashedPassword = await hash(password, 10);

        const user = await db.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });
        
        const { password: newPassword, ...rest } = user

        return NextResponse.json({useR: rest, message: "User Created." })

    }catch(err){
        return NextResponse.json({ message: "Something went wrong!" })
    }
}


export async function GET(req: NextRequest) {
    try{
        const body = await req.json();

        // const { username, password } = userSchema.parse(body);

        const userExists = await db.user.findUnique({
            where: {
                username: body.username
            }
        })

        if(userExists){
            return NextResponse.json({ message: "Username found." })
        }

    }catch(err){
        return NextResponse.json({ message: "Something went wrong!" })
    }
}
