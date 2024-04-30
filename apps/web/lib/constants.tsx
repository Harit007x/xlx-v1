import { Icons } from "../components/icons";
import { SideNavItem } from "../types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/home',
    icon: <Icons.home width="16" height="16" />,
  },
  {
    title: 'Account Info',
    path: '/account-info',
    icon: <Icons.userRound width="16" height="16" />,
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <Icons.folder width="16" height="16" />,
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
    icon: <Icons.mail width="16" height="16" />,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Icons.settings width="16" height="16" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  {
    title: 'Help',
    path: '/help',
    icon: <Icons.helpCircle width="16" height="16" />,
  },
];
