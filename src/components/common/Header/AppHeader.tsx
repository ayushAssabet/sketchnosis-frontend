import { SearchIcon } from "lucide-react";
// import { ModeToggle } from "./_partials/modeToggle";
import { SheetMenu } from "./_partials/sheetMenu";
import { UserNav } from "./_partials/userNav";
import UserNotifications from "./_partials/userNotifications";
import { Input } from "@/components/ui/input";
import BreadCrumbNav, { BreadCrumbItemInterface } from "../BreadCumbNav/BreadCrumbNav";

const AppHeader: React.FC<{
    title : string 
    breadCrumbItems : BreadCrumbItemInterface[]
}> = ({

    title , 
    breadCrumbItems

}) => {
    return (
        <header className="sticky top-0 z-10 w-full bg-background/95  shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="flex items-center container py-4 px-4 sm:px-8 mx-auto">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                </div>
                
                <div className="breadcrumb">
                    <h2 className="text-2xl font-bold text-[#1B1B1B] mb-1">{title}</h2>
                    <BreadCrumbNav 
                        breadCrumbItems={breadCrumbItems}
                    />
                </div>

                
                <div className="flex flex-1 items-center gap-3 justify-end">
                    <UserNotifications />
                    {/* <ModeToggle /> */}
                    <UserNav />
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
