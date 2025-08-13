import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { formatPermissions } from "@/features/access/helpers/formatPermission.helper";
import { useState, useEffect } from "react";
import { useAuthorization } from "@/features/access/hooks/useAuthorization";

const AccessList = ({ permission = [], roles = [] , mutatePermission , mutateRoles }) => {
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState({});

    const { updateRolePermissions } = useAuthorization(mutateRoles);

    useEffect(() => {
        if (roles.length && permission.length) {
            const formattedPerms = formatPermissions(roles, permission);
            setPermissions(formattedPerms);
        }
    }, [permission, roles]);

    // Function to send API request

    const togglePermission = async (role, category, permissionItem) => {
        setPermissions((prev) => {
            const updated = {
                ...prev,
                [role]: {
                    ...prev[role],
                    [category]: prev[role][category].map((perm) =>
                        perm.label === permissionItem.label
                            ? { ...perm, isAssigned: !perm.isAssigned }
                            : perm
                    ),
                },
            };

            // Get selected permissions immediately from the *updated* state
            const selectedPermissionIds = getSelectedPermissionIdsFromState(
                updated,
                role
            );            
            updateRolePermissions(
                roles?.filter((r) => r?.name?.toLowerCase() == role?.toLowerCase())?.at(0)?.id,
                selectedPermissionIds
            );

            return updated;
        });
    };

    const getSelectedPermissionIdsFromState = (state, role) => {
        const rolePermissions = state[role];
        if (!rolePermissions) return [];
        return Object.values(rolePermissions)
            .flat()
            .filter((perm: any) => perm.isAssigned)
            .map((perm: any) => perm.permissionId || perm.id);
    };

    const countPermissions = (role) => {
        return Object.values(permissions[role] || {})
            .flat()
            .filter((perm: any) => perm.isAssigned).length;
    };

    const PermissionSection = ({ title, rolePermissions, category, role }) => (
        <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-600 mb-3">{title}</h4>
            <div className="space-y-3">
                {rolePermissions?.[category]?.map((permItem, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <Checkbox
                            id={`${role}-${category}-${permItem.label}`}
                            checked={permItem.isAssigned}
                            onCheckedChange={() =>
                                togglePermission(role, category, permItem)
                            }
                            className="w-4 h-4"
                            disabled={loading[role]}
                        />
                        <label
                            htmlFor={`${role}-${category}-${permItem.label}`}
                            className={`text-sm cursor-pointer select-none ${
                                loading[role]
                                    ? "text-gray-400"
                                    : "text-gray-700"
                            }`}
                        >
                            {permItem.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );

    const RoleCard = ({ role, rolePermissions }) => (
        <Card className="mb-4">
            <CardContent className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                        {role}
                        {loading[role] && (
                            <span className="ml-2 text-sm text-blue-500">
                                Updating...
                            </span>
                        )}
                    </h3>
                    <span className="text-sm text-gray-500">
                        {countPermissions(role)} Permissions assigned
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {Object.keys(rolePermissions).map((category) => (
                        <PermissionSection
                            key={category}
                            title={category
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            rolePermissions={rolePermissions}
                            category={category}
                            role={role}
                        />
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="max-w-6xl mx-auto min-h-screen">
            <div className="space-y-6">
                {Object.entries(permissions).map(([role, rolePermissions]) => (
                    <RoleCard
                        key={role}
                        role={role}
                        rolePermissions={rolePermissions}
                    />
                ))}
            </div>
        </div>
    );
};

export default AccessList;
