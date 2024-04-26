'use client'
import { Button, buttonVariants } from "@repo/ui/shadcn";
import { cn } from "@repo/ui/utils";
import Link from "next/link";
import { useTheme } from "next-themes"
import { signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";

export default function IndexPage() {
  const { theme, setTheme } = useTheme() || {};
  const session = useSession();

  if(!session.data?.user){
    redirect('/login');
  }
  
  return (
    <main>
        <h1>Home Page</h1>
        <Link
            href="/login"
            className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "px-4"
            )}
        >
            Login
        </Link>

        <Button
          onClick={() => signOut()}
        >
          Logout
        </Button>

        <br/><br/>

        <Button
          onClick={() => setTheme('light')}
        >
          Light
        </Button>
        <Button
          onClick={() => setTheme('dark')}
        >
          Dark
        </Button>

    </main>
  )
}
