'use client'
import { buttonVariants } from "@repo/ui/shadcn";
import { cn } from "@repo/ui/utils";
import Link from "next/link";


// Not using this page, but after deleting it, it throws an error 404 not found for not found page it self.


export default function Temp() {
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

    </main>
  )
}
