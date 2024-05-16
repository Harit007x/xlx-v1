'use client'
import { Button, buttonVariants } from "@repo/ui/shadcn";
import { cn } from "@repo/ui/utils";
import Link from "next/link";
import { useTheme } from "next-themes"
import { signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';
import { redirect } from "next/navigation";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "@repo/store";
import { useEffect } from "react";


// Not using this page, but after deleting it, it throws an error 404 not found for not found page it self.


export default function Temp() {
  const { theme, setTheme } = useTheme() || {};
  const session = useSession();
  const setUser = useSetRecoilState(userAtom);
  const user = useRecoilValue(userAtom)
  const { data } = session;

  if(!session.data?.user){
    setUser(null);
    redirect('/login');
  }else{
    useEffect(()=>{
      setUser({
        // @ts-ignore
        user_id: session?.data?.user?.user_id,
        // @ts-ignore
        username: session?.data?.user?.username,
        // @ts-ignore
        first_name: session?.data?.user?.first_name,
        // @ts-ignore
        last_name: session?.data?.user?.last_name,
      });
    },[session])
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
