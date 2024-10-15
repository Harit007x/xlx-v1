import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import { userLoginSchema } from '../../../actions/user/schema';
import { db } from '@repo/db';

export async function POST(req: NextRequest) {
  try {
    const body = new URLSearchParams(await req.text());
    const usernames: any = body.get('username');
    const passwords = body.get('password');
    const parsed = userLoginSchema.safeParse({ username: usernames, password: passwords });
    console.log('first check pojnt - -- - - -')
    if (!parsed.success) {
      const error = JSON.parse(parsed.error.message);
      return NextResponse.json({ message: error[0].message });
    }

    const { username, password } = parsed.data;
    console.log(' almost made it =', parsed.data)
    const userExists = await db.user.findUnique({
      where: { username },
    });

    if (!userExists) {
      return NextResponse.json({ data: {}, message: 'Username or password is incorrect!', status: 401 });
    }

    const passwordMatch = await compare(password, userExists.password);
    console.log('second passed as well ', userExists)
    if (!passwordMatch) {
      return NextResponse.json({ data: {}, message: 'Username or password is incorrect!', status: 401 });
    }
    console.log('reached here =')
    return NextResponse.json(userExists);
  } catch (err) {
    return NextResponse.json(null);
  }
}
