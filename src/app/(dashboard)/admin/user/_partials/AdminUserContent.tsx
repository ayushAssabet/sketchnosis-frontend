"use client";

import { appRoutes } from "@/lib/routes";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import AdminUserManagement from "./AdminUserList";

const AdminUserContent: React.FC = () => {

    return (
        <div>
            <PrivateView
                title="Admin User Management"
                breadCrumbItems={[
                    {
                        title: "Admin User Management",
                        href: appRoutes.CAMPAIGN_INDEX_PAGE,
                    },
                ]}
            >
                <CommonContainer title="admin-user-list">
                  <AdminUserManagement />
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default AdminUserContent;
