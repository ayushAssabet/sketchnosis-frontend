import { appRoutes } from "@/lib/routes";
import {
    Users,
    LayoutGrid,
    LucideIcon,
    PlusSquare,
    Megaphone,
    Palette,
    Shapes,
    Shield,
} from "lucide-react";
import { permissions } from "./permissions";

type Submenu = {
    href: string;
    label: string;
    active?: boolean;
    hasPermisson?: boolean;
};

type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: Submenu[];
    hasPermission?: string[];
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
                    hasPermission: [permissions.VIEW_CATEGORY],
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
                    hasPermission: [permissions.VIEW_CLINIC],
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
                    hasPermission: [permissions.VIEW_PATIENT],
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
                    hasPermission: [permissions.VIEW_CAMPAIGN],
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
                    hasPermission: [permissions.VIEW_ILLUSTRATION],
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
                    hasPermission: [permissions.VIEW_ADMIN],
                },
            ],
        },
        {
            groupLabel: "",
            menus: [
                {
                    href: appRoutes.ADMIN_MANAGEMENT_INDEX_PAGE,
                    label: "Admin Management",
                    icon: Users,
                    hasPermission: [permissions.VIEW_ADMIN],
                },
            ],
        },
    ];
}
