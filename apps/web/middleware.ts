import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async (req) => {
    const token = await getToken({ req });
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/sessions', req.url));
      }
      return null;
    } else if (req.nextUrl.pathname === '/') {
      if (isAuth) {
        return NextResponse.redirect(new URL('/sessions', req.url));
      }
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL(`/login`, req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/',
    '/sessions',
    '/home',
    '/login',
    '/register',
    '/live-session/:path*'  // This handles dynamic routes like /live-session/[id]
  ],
};
