import { Metadata } from "next";

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
    // @ts-ignore
    if (session?.user.id) {
        redirect('/home');
    }

    return (
        <main className="container flex h-screen w-screen flex-col items-center justify-center">
            <div className="absolute h-full w-full -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
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