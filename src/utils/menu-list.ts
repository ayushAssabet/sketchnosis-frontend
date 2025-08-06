import { appRoutes } from "@/lib/routes";
import {
    Users,
    Settings,
    LayoutGrid,
    LucideIcon,
    Split,
    PlusIcon,
    PlusSquare,
    Megaphone,
    Palette,
    Shapes,
} from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active?: boolean;
};

type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: appRoutes.DASHBOARD_INDEX_PAGE,
                    label: "Dashboard",
                    icon: LayoutGrid,
                },
            ],
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: appRoutes.CATEGORY_INDEX_PAGE,
                    label: "Categories",
                    icon: Shapes,
                },
            ],
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: appRoutes.CLINIC_INDEX_PAGE,
                    label: "Clinics",
                    icon: PlusSquare,
                },
            ],
        },
        // {
        //     groupLabel: "",
        //     menus: [
        //         {
        //             href: appRoutes.PATIENT_INDEX_PAGE,
        //             label: "Patients",
        //             icon: Users,
        //         },
        //     ],
        // },
        {
            groupLabel: "",
            menus: [
                {
                    href: appRoutes.CAMPAIGN_INDEX_PAGE,
                    label: "Campaigns",
                    icon: Megaphone,
                },
            ],
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: appRoutes.ILLUSTRATIONS_INDEX_PAGE,
                    label: "Illustrations",
                    icon: Palette,
                },
            ],
        },
    ];
}
