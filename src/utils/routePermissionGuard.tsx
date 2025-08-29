"use client";

import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "@/features/login/context/AuthContextProvider";
import { Loader } from "lucide-react";
import { hasPermission } from "@/helpers/permission.helper";
import { routePermissions } from "@/lib/routePermissions";
import { useGetAllPermissionsByUserId } from "@/features/access/hooks/usePermissions";
import { appRoutes } from "@/lib/routes";


const RoutePermissionGuard = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const { loading, user } = useAuth();
    const { data , isLoading  } = useGetAllPermissionsByUserId()

    // Helper: match route with wildcard support (:id)
    const getRequiredPermissions = (path: string): string[] => {
      for (const route in routePermissions) {
        const routePattern = route.replace(/:[^/]+/g, "[^/]+"); // replace :id with regex
        const regex = new RegExp(`^${routePattern}$`);
        if (regex.test(path)) {
          return routePermissions[route];
        }
      }
      return [];
    };

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push(appRoutes.LOGIN_INDEX_PAGE);
          return;
        }

        const requiredPermissions = getRequiredPermissions(pathname);
        const isAllowed =
          requiredPermissions.length === 0 ||
          hasPermission(requiredPermissions, data?.data);

        if (!isAllowed && !isLoading) {
          router.push(appRoutes.FORBIDDEN_PAGE || "/forbidden");
        }
      }
    }, [loading, user, pathname, router , isLoading]);

    if (loading) {
      return (
        <div className="fixed w-full h-full flex justify-center items-center bg-white">
          <Loader />
        </div>
      );
    }

    const requiredPermissions = getRequiredPermissions(pathname);
    const isAllowed =
      requiredPermissions.length === 0 ||
      hasPermission(requiredPermissions, data?.data);

    if (!user || !isAllowed) return null;

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default RoutePermissionGuard;
