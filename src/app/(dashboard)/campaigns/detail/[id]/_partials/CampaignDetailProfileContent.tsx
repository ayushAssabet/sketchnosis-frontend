"use client";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import { appRoutes } from "@/lib/routes";
import ProfileHeader from "./ProfileHeader";
import { useGetCampaignDetail } from "@/features/campaigns/hooks/useGetCampaigns";
import IllustrationList from "./IllustrationList";

const CampaignDetailProfileContent = ({ id }: { id: string }) => {
    const { data, isLoading } = useGetCampaignDetail(id);
    console.log(data)
    return (
        <>
            <PrivateView
                title="Campaign"
                breadCrumbItems={[
                    { title: "Campaign", href: appRoutes.CAMPAIGN_INDEX_PAGE },
                    {
                        title: "Campaign Detail",
                        href: appRoutes.CAMPAIGN_INDIVIDUAL_PAGE,
                    },
                ]}
            >
                <CommonContainer title="campaign-list-section">
                    <>
                        <div className="py-10 px-12">
                            <ProfileHeader entity={data?.data} />
                            <IllustrationList illustrationList={data?.data?.scheduleImages ?? []} />
                        </div>
                    </>
                </CommonContainer>
            </PrivateView>
        </>
    );
};

export default CampaignDetailProfileContent;
