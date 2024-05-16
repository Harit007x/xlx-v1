export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
};

export type SessionBoxItems = {
    sessionName: string,
    scheduledDateTime: string,
    description: string,
    tags: Array<string>
}