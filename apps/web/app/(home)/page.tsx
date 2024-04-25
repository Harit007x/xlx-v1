'use client'
import { Button, buttonVariants } from "@repo/ui/shadcn";
import { cn } from "@repo/ui/utils";
import Link from "next/link";
import { useTheme } from "next-themes"

export default function IndexPage() {
  const { theme, setTheme } = useTheme() || {};  return (
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
