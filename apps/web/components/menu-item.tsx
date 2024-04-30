'use client'
import { useState } from "react";
import { SideNavItem } from "../types/types";
import { Icons } from "./icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MenuItem = ({ item }: { item: SideNavItem }) => {
    const originPathname = usePathname()
    const pathname = originPathname+''
    const [subMenuOpen, setSubMenuOpen] = useState(false);
    const toggleSubMenu = () => {
      setSubMenuOpen(!subMenuOpen);
    };
  
    return (
      <main>
        {item.submenu ? (
          <>
            <button
              onClick={toggleSubMenu}
              className={`flex flex-row items-center p-2 rounded-lg hover-bg-blueBackground w-full justify-between hover:bg-blueBackground ${
                pathname.includes(item.path) ? 'bg-zinc-100' : ''
              }`}
            >
              <div className="flex flex-row space-x-4 items-center ml-1">
                {item.icon}
                <span className="font-medium text-sm flex">{item.title}</span>
              </div>
  
              <div className={`${subMenuOpen ? 'rotate-180' : ''} flex ml-6`}>
                <Icons.chevronDown width="16" height="16" />
              </div>
            </button>
  
            {subMenuOpen && (
              <div className="ml-5 flex flex-col border-l ">
                {item.subMenuItems?.map((subItem:any, idx:any) => {
                  return (
                    <Link
                      key={idx}
                      href={subItem.path}
                      className={`
                          ${subItem.path === pathname ? 'font-medium' : ''} 
                          hover:bg-blueBackground text-sm font-normal w-[10rem] p-2 pl-4 ml-2 rounded-lg flex justify-start items-center
                      `}
                    >
                      <span>{subItem.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.path}
            className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-blueBackground ${
              item.path === pathname ? 'bg-blueBackground text-blue' : ''
            }`}
          >
            <div className="flex flex-row space-x-3 items-center ml-1">
              {item.icon}
              <span className="font-medium text-sm flex">{item.title}</span>
            </div>
          </Link>
        )}
      </main>
    );
};