'use client'
import AppHeader from "@/components/common/Header/AppHeader";
import { AppSideBar } from "@/components/common/Sidebar/AppSidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import isAuthenticated from "@/utils/isAuthenticated";

const AdminPrivateView: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const sidebar = useSidebar();
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;
  return (
    <>
      <AppSideBar />
      <div
        className={cn(
          " transition-[margin-left] ease-in-out duration-300 relative",
          !settings.disabled &&
            (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-[200px]")
        )}
      >
        <AppHeader />
        <main className="bg-zinc-50 dark:bg-zinc-900 min-h-[calc(100vh_-_64px)]">
          {children}
        </main>
      </div>
    </>
  );
};

export default isAuthenticated(AdminPrivateView);
