import { Icons } from "../../../packages/ui/src/icons";
import { TSessionBoxItems, SideNavItem } from "../types/types";

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


// export const SESSION_BOX_ITEMS: TSessionBoxItems[] = [
  
//   {
//     id: 1,
//     name: "Devops",
//     schedule_date_time: new Date("2022-03-25"),
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever since the 1500s.",
//     tags: [
//       { value: 'chocolate', label: 'Chocolate' },
//       { value: 'strawberry', label: 'Strawberry' }
//     ],
//     is_auto: true,
//     password: "random@231"
//   },
//   {
//     id: 2,
//     name: "Database",
//     schedule_date_time: new Date("2022-03-25"),
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever since the 1500s.",
//     tags: [
//       { value: 'indexing', label: 'Indexing' },
//       { value: 'normalizing', label: 'Normalizing' },
//       { value: 'postgres', label: 'Postgres' }
//     ],
//     is_auto: true,
//     password: "random@231"
//   },
//   {
//     id: 3,
//     name: "Gaming",
//     schedule_date_time: new Date("2022-03-25"),
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever since the 1500s.",
//     tags: [
//       { value: 'csgo', label: 'Csgo' },
//       { value: 'valorant', label: 'Valorant' },
//       { value: 'nfs', label: 'Nfs' },
//     ],
//     is_auto: true,
//     password: "random@231"
//   },
//   {
//     id: 4,
//     name: "Data Structures",
//     schedule_date_time: new Date("2022-03-25"),
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever since the 1500s.",
//     tags: [
//       { value: 'sorting', label: 'Sorting' },
//       { value: 'arrays', label: 'Arrays' },
//       { value: 'strings', label: 'Strings' },
//     ],
//     is_auto: true,
//     password: "random@231"
//   },
//   {
//     id: 5,
//     name: "Web3",
//     schedule_date_time: new Date("2022-03-25"),
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever since the 1500s.",
//     tags: [
//       { value: 'ethereum', label: 'Ethereum' },
//       { value: 'solana', label: 'Solana' },
//       { value: 'contracts', label: 'Contracts' },
//     ],
//     is_auto: true,
//     password: "random@231"
//   },
//   {
//     id: 6,
//     name: "Design",
//     schedule_date_time: new Date("2022-03-25"),
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has the industry's standard dummy text ever since the 1500s.",
//     tags: [
//       { value: 'figma', label: 'Figma' },
//       { value: 'behance', label: 'Behance' },
//       { value: 'adobe', label: 'Adobe' },
//     ],
//     is_auto: true,
//     password: "random@231"
//   },
// ];
