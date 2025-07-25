"use client";
import { Menu } from "@/components/common/Sidebar/_partials/menu";
import { SidebarToggle } from "@/components/common/Sidebar/_partials/sidebarToggle";
import { Button } from "@/components/ui/button";
import { appImages } from "@/helpers/image.helper";
import { SidebarContext } from "@/hooks/use-sidebar";
import { appRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export function AppSideBar() {
    const sidebar = useContext(SidebarContext);
    if (!sidebar) return null;
    const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;

    return (
        <aside
            className={cn(
                "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
                !getOpenState() ? "w-[90px]" : "w-64",
                settings.disabled && "hidden"
            )}
        >
            <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
            <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
            >
                <Button
                    className={cn(
                        "transition-transform ease-in-out duration-300 mb-1",
                        !getOpenState() ? "translate-x-1" : "translate-x-0"
                    )}
                    variant="link"
                    asChild
                ></Button>
                <Link href={appRoutes.DASHBOARD_INDEX_PAGE} className="block py-1">
                    <Image
                        src={appImages.brandLogo}
                        width={150}
                        height={300}
                        alt="brand-logo"
                        className="mx-auto block"
                        style={{}}
                    />
                </Link>
                <Menu isOpen={getOpenState()} />
            </div>
        </aside>
    );
}
