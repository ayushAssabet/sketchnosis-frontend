import { useState } from "react";

const AccessList = () => {
    const [permissions, setPermissions] = useState({
        "Super-Admin": {
            userManagement: [
                "Add New User",
                "Edit User Details",
                "Remove User",
                "View All Users",
            ],
            adminManagement: [
                "Add Admin",
                "Edit Admin Details",
                "Remove Admin",
                "View All Admins",
            ],
            patientManagement: [
                "Add Patient",
                "Edit Patient Details",
                "Remove Patient",
                "View All Patient",
            ],
        },
        Admin: {
            userManagement: [
                "Add New User",
                "Edit User Details",
                "Remove User",
                "View All Users",
            ],
            adminManagement: [],
            patientManagement: [],
        },
        Clinic: {
            userManagement: [],
            adminManagement: [],
            patientManagement: [
                "Add Patient",
                "Edit Patient Details",
                "Remove Patient",
                "View All Patient",
            ],
        },
    });

    const allPermissions = {
        userManagement: [
            "Add New User",
            "Edit User Details",
            "Remove User",
            "View All Users",
        ],
        adminManagement: [
            "Add Admin",
            "Edit Admin Details",
            "Remove Admin",
            "View All Admins",
        ],
        patientManagement: [
            "Add Patient",
            "Edit Patient Details",
            "Remove Patient",
            "View All Patient",
        ],
    };

    const togglePermission = (role, category, permission) => {
        setPermissions((prev) => ({
            ...prev,
            [role]: {
                ...prev[role],
                [category]: prev[role][category].includes(permission)
                    ? prev[role][category].filter((p) => p !== permission)
                    : [...prev[role][category], permission],
            },
        }));
    };

    const countPermissions = (role) => {
        return Object.values(permissions[role]).flat().length;
    };

    const PermissionSection = ({
        title,
        permissions: rolePermissions,
        category,
        role,
    }) => (
        <div className="flex-1">
            <h4 className="text-sm text-gray-600 mb-3">{title}</h4>
            <div className="space-y-2">
                {allPermissions[category].map((permission) => (
                    <label
                        key={permission}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            checked={rolePermissions[category].includes(
                                permission
                            )}
                            onChange={() =>
                                togglePermission(role, category, permission)
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                            {permission}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );

    const RoleCard = ({ role, rolePermissions }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">{role}</h3>
                <span className="text-sm text-gray-500">
                    {countPermissions(role)} Permissions assigned
                </span>
            </div>

            <div className="flex space-x-8">
                <PermissionSection
                    title="User Management"
                    permissions={rolePermissions}
                    category="userManagement"
                    role={role}
                />
                <PermissionSection
                    title="Admin Management"
                    permissions={rolePermissions}
                    category="adminManagement"
                    role={role}
                />
                <PermissionSection
                    title="Patient Management"
                    permissions={rolePermissions}
                    category="patientManagement"
                    role={role}
                />
            </div>
        </div>
    );
    return (
        <>
            <div className="space-y-6">
                {Object.entries(permissions).map(([role, rolePermissions]) => (
                    <RoleCard
                        key={role}
                        role={role}
                        rolePermissions={rolePermissions}
                    />
                ))}
            </div>
        </>
    );
};

export default AccessList;
