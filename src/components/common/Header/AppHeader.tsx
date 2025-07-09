import { SearchIcon } from "lucide-react";
// import { ModeToggle } from "./_partials/modeToggle";
import { SheetMenu } from "./_partials/sheetMenu";
import { UserNav } from "./_partials/userNav";
import UserNotifications from "./_partials/userNotifications";
import { Input } from "@/components/ui/input";

const AppHeader: React.FC = () => {
    return (
        <header className="sticky top-0 z-10 w-full bg-background/95  shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
            <div className="flex h-14 items-center container py-4 px-4 sm:px-8 mx-auto">
                <div className="flex items-center space-x-4 lg:space-x-0">
                    <SheetMenu />
                </div>
                <div className="relative flex-1 max-w-md md:max-w-lg sm:ml-0 ml-2">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-muted pl-8 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
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
