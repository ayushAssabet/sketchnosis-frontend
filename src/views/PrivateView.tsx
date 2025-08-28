'use client'
import { BreadCrumbItemInterface } from "@/components/common/BreadCumbNav/BreadCrumbNav";
import AppHeader from "@/components/common/Header/AppHeader";
import { AppSideBar } from "@/components/common/Sidebar/AppSidebar";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import RoutePermissionGuard from "@/utils/routePermissionGuard";

const AdminPrivateView: React.FC<{ 
  children: React.ReactNode ,
  title : string 
  breadCrumbItems : BreadCrumbItemInterface[]
}> = ({
  children,
  title , 
  breadCrumbItems
  
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
            (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-64")
        )}
      >
        <AppHeader 
          title={title}
          breadCrumbItems={breadCrumbItems}
        />
        <main className="bg-zinc-50 dark:bg-zinc-900 min-h-[calc(100vh_-_64px)]">
          {children}
        </main>
      </div>
    </>
  );
};

export default RoutePermissionGuard(AdminPrivateView);
