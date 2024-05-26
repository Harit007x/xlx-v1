export type SideNavItem = {
    title: string;
    path: string;
    icon?: JSX.Element;
    submenu?: boolean;
    subMenuItems?: SideNavItem[];
};

export type TSessionBoxItems = {
    id?: number;
    name: string;
    schedule_date_time: Date;
    description: string;
    tags: any;
    onClick?: () => void;
    is_auto?: boolean;
    password?: string;
}