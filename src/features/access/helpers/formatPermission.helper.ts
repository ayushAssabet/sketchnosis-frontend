// This should be in your /features/access/helpers/formatPermission.helper.js

export const formatPermissions = (roles, permissions) => {
    const result = {};

    console.log("=== FORMAT PERMISSIONS HELPER DEBUG ===");
    console.log("Input roles:", roles);
    console.log("Input permissions:", permissions);

    roles.forEach((role) => {
        const roleName = role.name.charAt(0).toUpperCase() + role.name.slice(1);
        console.log(`Processing role: ${role.name} -> ${roleName}`);
        console.log("Role permissions:", role.permissions);

        result[roleName] = {
            categoryManagement: [],
            adminManagement: [],
            patientManagement: [],
            illustrationManagement: [],
            campaignManagement: [],
            clinicManagement: [],
            rolesManagement: [],
            settingsManagement: [],
        };

        permissions.forEach((permission) => {
            // Enhanced check for role assignments - handle different API structures
            let isAssigned = false;

            if (role.permissions) {
                // Check different possible structures
                if (Array.isArray(role.permissions)) {
                    // If permissions is an array of objects
                    isAssigned = role.permissions.some(
                        (rolePermission) =>
                            rolePermission.id === permission.id ||
                            rolePermission.permission_id === permission.id ||
                            rolePermission === permission.id
                    );
                } else if (typeof role.permissions === "object") {
                    // If permissions is an object
                    isAssigned = Object.values(role.permissions).some(
                        (perm: any) =>
                            perm.id === permission.id || perm === permission.id
                    );
                }
            }

            // Create permission object with BOTH original ID and permission ID for reliability
            const permissionObj = {
                label: formatPermissionName(permission.name),
                isAssigned: isAssigned,
                id: permission.id, // Original permission ID
                permissionId: permission.id, // Backup reference
                name: permission.name, // Keep original name for debugging
            };

            console.log("Created permission object:", permissionObj);

            // Categorize permissions based on their name
            if (permission.name.includes("category")) {
                result[roleName].categoryManagement.push(permissionObj);
            } else if (permission.name.includes("admin")) {
                result[roleName].adminManagement.push(permissionObj);
            } else if (permission.name.includes("patient")) {
                result[roleName].patientManagement.push(permissionObj);
            } else if (permission.name.includes("illustration")) {
                result[roleName].illustrationManagement.push(permissionObj);
            } else if (permission.name.includes("campaign")) {
                result[roleName].campaignManagement.push(permissionObj);
            } else if (permission.name.includes("clinic")) {
                result[roleName].clinicManagement.push(permissionObj);
            } else if (permission.name.includes("roles")) {
                result[roleName].rolesManagement.push(permissionObj);
            } else if (permission.name.includes("settings")) {
                result[roleName].settingsManagement.push(permissionObj);
            } else {
                // Handle any other permissions that don't fit the categories
                console.warn("Uncategorized permission:", permission.name);
                result[roleName].categoryManagement.push(permissionObj); // Default to category
            }
        });
    });

    console.log("Final formatted result:", result);
    return result;
};

// Helper function to format permission names to readable labels
const formatPermissionName = (permissionName) => {
    const labelMap = {
        // Category permissions
        view_category: "View All Categorys",
        add_category: "Add New Category",
        edit_category: "Edit Category Details",
        delete_category: "Remove Category",

        // Admin permissions
        view_admin: "View All Admins",
        add_admin: "Add Admin",
        edit_admin: "Edit Admin Details",
        delete_admin: "Remove Admin",

        // Patient permissions
        view_patient: "View All Patient",
        add_patient: "Add Patient",
        edit_patient: "Edit Patient Details",
        delete_patient: "Remove Patient",

        // Illustration permissions
        view_illustration: "View All Illustrations",
        add_illustration: "Add New Illustration",
        edit_illustration: "Edit Illustration Details",
        delete_illustration: "Remove Illustration",

        // Campaign permissions
        view_campaign: "View All Campaigns",
        add_campaign: "Add New Campaign",
        edit_campaign: "Edit Campaign Details",
        delete_campaign: "Remove Campaign",

        // Clinic permissions
        view_clinic: "View All Clinics",
        add_clinic: "Add New Clinic",
        edit_clinic: "Edit Clinic Details",
        delete_clinic: "Remove Clinic",

        // Roles permissions
        view_roles: "View All Roles",
        add_roles: "Add New Role",
        edit_roles: "Edit Role Details",
        delete_roles: "Remove Role",

        // Settings permissions
        view_settings: "View All Settings",
        add_settings: "Add New Setting",
        edit_settings: "Edit Setting Details",
        delete_settings: "Remove Setting",
    };

    return (
        labelMap[permissionName] ||
        permissionName
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    );
};
