'use client'
import { useState } from "react";
import { SideNavItem } from "../types/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icons } from "../../../packages/ui/src/icons";

export const MenuItem = ({ item, onClick }: { item: SideNavItem, onClick: () => void }) => {
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
              className={`flex flex-row items-center py-[0.6rem] px-3 rounded-lg w-full justify-between hover:bg-muted ${
                pathname.includes(item.path) ? 'bg-zinc-100' : ''
              }`}
            >
              <div className="flex flex-row space-x-2 px-0 items-center ml-1">
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
                          hover:bg-muted text-sm font-normal w-[10rem] p-2 py-[0.6rem] pl-4 ml-3 rounded-lg flex justify-start items-center
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
            className={`flex flex-row items-center p-2 rounded-lg  ${
              item.path === pathname ? 'bg-foreground text-background' : 'hover:bg-muted'
            } py-[0.6rem] px-3`}
          >
            <div className="flex flex-row space-x-2 items-center ml-1">
              {item.icon}
              <span className="font-medium text-sm flex">{item.title}</span>
            </div>
          </Link>
        )}
      </main>
    );
};