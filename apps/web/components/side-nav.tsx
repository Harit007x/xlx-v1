'use client'

import { useTheme } from "next-themes";
import Link from "next/link";
import { SIDENAV_ITEMS } from "../lib/constants";
import { MenuItem } from "./menu-item";
import { Avatar, AvatarFallback, AvatarImage, Label } from "@repo/ui/shadcn";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../../packages/store/src/atoms";
import { signOut } from "next-auth/react";
import { Icons } from "../../../packages/ui/src/icons";

const SideNav = () => {
  const { theme, setTheme } = useTheme()
  const user = useRecoilValue(userAtom)
  return (
    <main className='flex h-screen'>
        <div 
          style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
          className="md:w-[18rem] min-w-fit max-w-[22rem] flex-1 border-r hidden md:flex h-screen overflow-y-auto"
        >
            <div className="flex flex-col w-full justify-between">
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-[1rem] border-b">
                        <Link
                            href="/"
                            className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 h-16"
                        >
                            <span className="h-4 w-4 bg-zinc-300 rounded-lg" />
                            <span className="font-bold text-xl text-foreground hidden md:flex">Logo</span>
                        </Link>
                        {theme == 'light'
                            ?
                                <Icons.sun 
                                    className="cursor-pointer h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                                    onClick={()=>setTheme('dark')}
                                />
                            :
                                <Icons.moon
                                    className="cursor-pointer h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                                    onClick={()=>setTheme('light')}
                                />
                        }
                    </div>
                    <div className="flex flex-col space-y-1 md:px-6 ">
                        {SIDENAV_ITEMS.map((item:any, idx:any) => {
                            return <MenuItem key={idx} item={item} />;
                        })}
                    </div>
                </div>
                <div className="flex items-center justify-between gap-2 p-5 antialiased text-sm">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="1.jpeg"/>
                            <AvatarFallback>TS</AvatarFallback>
                        </Avatar>
                        <div className="flex-col">
                            <div className="font-semibold">{user?.first_name} {user?.last_name}</div>
                            <div>{user?.username}</div>
                        </div>
                    </div>

                    <Icons.logout 
                        width="19"
                        height="19"
                        className="cursor-pointer"
                        onClick={() => signOut()}
                    />
                </div>
            </div>
        </div>
    </main>
  );
};
  
export default SideNav;
  
