export const hasPermission = (
    requiredPermissions: string[],
    userPermissions: any[]
): boolean => {
    if (!requiredPermissions || requiredPermissions.length === 0) {
        return true; // No permissions required
    }

    const userPermissionNames = userPermissions?.map(
        (p) => (typeof p === "string" ? p : p.name) // adapt if field is different
    );

    return requiredPermissions?.some((permission) =>
        userPermissionNames?.includes(permission)
    );
};
