import { NextRequest, NextResponse } from 'next/server';
import { compare, hash } from 'bcrypt';
import * as z from "zod";
import { db } from '../../../db';
import { userLoginSchema } from '../../../actions/user/schema';

export async function POST(req: NextRequest) {
    try{
        const body = new URLSearchParams(await req.text());
        const usernames:any = body.get('username');
        const passwords = body.get('password');
        const parsed = userLoginSchema.safeParse({"username": usernames, "password": passwords});

        if (!parsed.success) {
            let error = JSON.parse(parsed.error.message)
            return NextResponse.json({ message: error[0].message });
        }

        const { username, password } = parsed.data;
        
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
 
        return NextResponse.json(userExists)

    }catch(err){
        return NextResponse.json({ message: "Something went wrong!" })
    }
}