"use client";

import { appRoutes } from "@/lib/routes";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import AccessList from "./AccessList";
import { useGetAllRoles } from "@/features/access/hooks/useRole";
import { useGetAllPermissions } from "@/features/access/hooks/usePermissions";

const CampaignContent: React.FC = () => {
    
    const { data, isLoading, mutate } = useGetAllRoles();
    const { data : permissionData , isLoading : isPermissionLoading , mutate : permissionMutate } = useGetAllPermissions();
    
    console.log(data)
    console.log(permissionData)

    return (
        <div>
            <PrivateView
                title="Access Management"
                breadCrumbItems={[
                    {
                        title: "Access Management",
                        href: appRoutes.CAMPAIGN_INDEX_PAGE,
                    },
                ]}
            >
                <CommonContainer title="campaign-list-section">
                    <AccessList permission={permissionData?.data} roles={data?.data} />
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default CampaignContent;
