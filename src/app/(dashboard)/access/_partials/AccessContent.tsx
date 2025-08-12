"use client";

import { appRoutes } from "@/lib/routes";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import { useCampaignsList } from "@/features/campaigns/hooks/useGetCampaigns";
import AccessList from "./AccessList";
import { useGetAllRoles } from "@/features/access/useAccess";

const CampaignContent: React.FC = () => {
    
    const { data, isLoading, mutate } = useGetAllRoles();
    console.log(data)

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
                    <AccessList />
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default CampaignContent;
