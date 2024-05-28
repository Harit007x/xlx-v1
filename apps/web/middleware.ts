import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    async function middleware(req) {

        const token = await getToken({ req })
        // console.log("check token =", token?.uid)
        const isAuth = !!token
        // console.log("autgh hai  =", isAuth  )
        const isAuthPage =
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/register")
        
        if (isAuthPage) {
          if (isAuth) {
            console.log("redirect after login", req.url)
            return NextResponse.redirect(new URL("/sessions", req.url))
          }
          return null
        }
    
        if (!isAuth) {
          let from = req.nextUrl.pathname;
          if (req.nextUrl.search) {
            from += req.nextUrl.search;
          }
          console.log("loggedIn nahi hai", req.url)
          return NextResponse.redirect(
            new URL(`/login`, req.url)
          );
        }
    },
    {
    callbacks: {
        async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
        },
    },
    }
)

export const config = {
    matcher: ["/", "/sessions", "/home", "/login", "/register"],
  }
  