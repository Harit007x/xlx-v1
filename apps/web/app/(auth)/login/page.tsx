import { Metadata } from "next"

import React from 'react';
import { cn } from "@repo/ui/utils";
import { UserLoginForm } from "../../../components/user-login-form";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";
import { Icons } from "../../../components/icons";

export const metadata: Metadata = {
    title: "Login",
    description: "Login to your account",
}

export default async function LoginPage(){
    const session = await getServerSession(authOptions);
    if (session?.user) {
        redirect('/');
    }

    return (
        <main className="container flex h-screen w-screen flex-col items-center justify-center">
            <Link
                href="/"
                className={cn(
                    "absolute left-4 top-4 md:left-8 md:top-8 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"
                )}
            >
                <div className="flex items-center">
                    <Icons.chevronLeft className="mr-2 h-4 w-4" />
                    Back
                </div>
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email to sign in to your account
                    </p>
                </div>

                <UserLoginForm/>

                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        href="/register"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        Don&apos;t have an account? Sign Up
                    </Link>
                </p>
            </div>
        </main>
    )
}