import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();

    console.log("fethced =", body)
    const prisma = new PrismaClient();

    const user = await prisma.user.create({
        data: {
            username: body.username,
            password: body.password
        }
    });
    

    return NextResponse.json({ message: "Create user." })
}
