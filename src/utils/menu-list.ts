import { appRoutes } from "@/lib/routes";
import {
    Users,
    LayoutGrid,
    LucideIcon,
    PlusSquare,
    Megaphone,
    Palette,
    Shapes,
    Lock,
    Shield,
    ShieldBan,
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
                    label: "Area of Concerns",
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
        {
            groupLabel: "",
            menus: [
                {
                    href: appRoutes.PATIENT_INDEX_PAGE,
                    label: "Patients",
                    icon: Users,
                },
            ],
        },
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
        {
            groupLabel: "",
            menus: [
                {
                    href: appRoutes.PERMISSION_MANAGEMENT_INDEX_PAGE,
                    label: "Access Management",
                    icon: Shield,
                },
            ],
        },
    ];
}
