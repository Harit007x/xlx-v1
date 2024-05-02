import { Icons } from "../components/icons";
import { SideNavItem } from "../types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/home',
    icon: <Icons.home width="18" height="18" className="mr-2" />,
  },
  {
    title: 'Sessions',
    path: '/sessions',
    icon: <Icons.userRound width="18" height="18" className="mr-2" />,
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <Icons.folder width="18" height="18" className="mr-2" />,
    submenu: true,
    subMenuItems: [
      { title: 'All', path: '/projects' },
      { title: 'Web Design', path: '/projects/web-design' },
      { title: 'Graphic Design', path: '/projects/graphic-design' },
    ],
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <Icons.mail width="18" height="18" className="mr-2" />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Icons.settings width="18" height="18" className="mr-2" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  {
    title: 'Help',
    path: '/help',
    icon: <Icons.helpCircle width="18" height="18" className="mr-2" />,
  },
];
