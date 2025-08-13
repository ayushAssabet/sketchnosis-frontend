"use client";

import AppAddButton from "@/components/elements/AddButton";
import { DebouncedSearch } from "@/components/elements/DebouncedSearch";
import FilterDropdown from "@/components/elements/FilterDropDown";
import { appRoutes } from "@/lib/routes";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import { useCampaignsList } from "@/features/campaigns/hooks/useGetCampaigns";
import ProfileTabs from "./ProfileTabs";

const ProfileContent: React.FC = () => {
    const { data, isLoading, mutate } = useCampaignsList();

    return (
        <div>
            <PrivateView
                title="Campaigns"
                breadCrumbItems={[
                    { title: "Campaigns", href: appRoutes.CAMPAIGN_INDEX_PAGE },
                ]}
            >
                <CommonContainer title="campaign-list-section">
                    <ProfileTabs />
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default ProfileContent;
