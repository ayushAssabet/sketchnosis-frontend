export const hasPermission = (permission: string, permissions: string[]) => {
    return permissions.includes(permission);
};
