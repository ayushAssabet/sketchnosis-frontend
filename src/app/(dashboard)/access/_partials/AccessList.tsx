import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { formatPermissions } from "@/features/access/helpers/formatPermission.helper";
import { useState, useEffect } from "react";
import { useAuthorization } from "@/features/access/hooks/useAuthorization";
import { ChevronDown, ChevronRight, Shield, Users, Building2, User, Settings, PlusSquare } from "lucide-react";

const AccessList = ({ permission = [], roles = [] , mutatePermission , mutateRoles }) => {
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState({});
    const [expandedRoles, setExpandedRoles] = useState(new Set(['super-admin'])); // Expand super-admin by default

    // Define static role order - this never changes
    const getRoleOrder = (availableRoles) => {
        const preferredOrder = ['super-admin', 'admin', 'clinic', 'patient'];
        return [
            ...preferredOrder.filter(role => availableRoles.includes(role)),
            ...availableRoles.filter(role => !preferredOrder.includes(role)).sort()
        ];
    };

    const getRoleIcon = (role) => {
        switch(role.toLowerCase()) {
            case 'super-admin': return Shield;
            case 'admin': return Settings;
            case 'clinic': return PlusSquare;
            case 'patient': return User;
            default: return Users;
        }
    };

    const toggleRole = (role) => {
        setExpandedRoles(prev => {
            const newSet = new Set(prev);
            if (newSet.has(role)) {
                newSet.delete(role);
            } else {
                newSet.add(role);
            }
            return newSet;
        });
    };

    const { updateRolePermissions } = useAuthorization(mutateRoles);

    useEffect(() => {
        if (roles.length && permission.length) {
            const formattedPerms = formatPermissions(roles, permission);
            setPermissions(formattedPerms);
        }
    }, [permission, roles]);

    const togglePermission = async (role, category, permissionItem) => {
        setPermissions((prev) => {
            // Create a new object that preserves the original order
            const updated = { ...prev };
            
            updated[role] = {
                ...prev[role],
                [category]: prev[role][category].map((perm) =>
                    perm.label === permissionItem.label
                        ? { ...perm, isAssigned: !perm.isAssigned }
                        : perm
                ),
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

    const countTotalPermissions = (role) => {
        return Object.values(permissions[role] || {})
            .flat().length;
    };

    const countCategories = (role) => {
        return Object.keys(permissions[role] || {}).length;
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

    const RoleCard = ({ role, rolePermissions }) => {
        const isExpanded = expandedRoles.has(role);
        const Icon = getRoleIcon(role);
        
        return (
            <div className="group border border-secondary rounded-xl shadow-sm hover:shadow-md transition-shadow">
                {/* Accordion Header */}
                <div 
                    className="cursor-pointer p-6"
                    onClick={() => toggleRole(role)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-secondary">
                                <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-primary capitalize">
                                    {role.replace('-', ' ')}
                                    {loading[role] && (
                                        <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 animate-pulse">
                                            Updating...
                                        </span>
                                    )}
                                </h3>
                                <div className="flex items-center space-x-4">
                                    <p className="text-sm text-gray-600">
                                        {countPermissions(role)} of {countTotalPermissions(role)} permissions assigned
                                    </p>
                                    <span className="text-gray-300">•</span>
                                    <p className="text-sm text-gray-600">
                                        {countCategories(role)} categories
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                                <ChevronRight className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accordion Content */}
                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="px-6 pb-6">
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
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto min-h-screen">
            <div className="space-y-6">
                {/* Calculate role order dynamically but consistently */}
                {getRoleOrder(Object.keys(permissions)).map((role) => {
                    const rolePermissions = permissions[role];
                    if (!rolePermissions) return null;
                    
                    return (
                        <RoleCard
                            key={role}
                            role={role}
                            rolePermissions={rolePermissions}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default AccessList;