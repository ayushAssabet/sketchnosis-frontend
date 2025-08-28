"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "@/features/login/context/AuthContextProvider";
import { Loader } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import { useGetAllPermissionsByUserId } from "@/features/access/hooks/usePermissions";

const isAuthenticated = <P extends object>(
    WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
    const Wrapper: React.FC<P> = (props) => {
        const router = useRouter();
        const { loading, user } = useAuth();
        const { data  } = useGetAllPermissionsByUserId();

        useEffect(() => {
            console.log(loading, user);
            if (!loading && !user) {
                router.push(appRoutes.LOGIN_INDEX_PAGE);
            }
        }, [user, loading, router]);

        if (loading)
            return (
                <div className="fixed w-full h-full flex justify-center items-center bg-white">
                    <Loader />
                </div>
            );
        return user ? <WrappedComponent {...props} /> : null;
    };

    return Wrapper;
};

export default isAuthenticated;
