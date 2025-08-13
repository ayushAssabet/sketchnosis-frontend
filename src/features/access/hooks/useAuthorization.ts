import { createApiRequest } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { useCallback, useState } from "react";
import useSWR from "swr";

export const useAuthorization = (mutate? : () => void) => {
    const [isRolePermissionUpdating, setIsRolePermissionUpdating] =
        useState<boolean>(false);
    const fetcher = createApiRequest();

    const updateRolePermissions = useCallback(
        async (id, permissions: any) => {
            setIsRolePermissionUpdating(true);
            try {
                await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/admin/management/role-permission/${id}`,
                    method: "POST",
                    body: {permissions : permissions},
                });
                mutate();
            } catch (error: any) {
                console.error("Error adding clinic:", error);
                throw error;
            } finally {
                setIsRolePermissionUpdating(false);
            }
        },
        [mutate, fetcher]
    );

    return {
        updateRolePermissions,
        isRolePermissionUpdating,
    };
};
