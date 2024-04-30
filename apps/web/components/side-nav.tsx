'use client'

import { useTheme } from "next-themes";
import Link from "next/link";
import { Icons } from "./icons";
import { SIDENAV_ITEMS } from "../lib/constants";
import { MenuItem } from "./menu-item";

const SideNav = () => {
  const { theme, setTheme } = useTheme()
  
  return (
    <main className='flex h-screen'>
        <div 
          style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
          className="md:w-60 min-w-fit max-w-[22rem] flex-1 border-r border-zinc-200 hidden md:flex h-screen overflow-y-auto"
        >
            <div className="flex flex-col space-y-6 w-full">
              <div className="flex items-center justify-between px-[1rem] border-b border-zinc-200">
                  <Link
                      href="/"
                      className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 h-12"
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
                <div className="flex flex-col space-y-2 md:px-6 ">
                  {SIDENAV_ITEMS.map((item:any, idx:any) => {
                      return <MenuItem key={idx} item={item} />;
                  })}
                </div>
            </div>
        </div>
    </main>
  );
};
  
export default SideNav;
  
