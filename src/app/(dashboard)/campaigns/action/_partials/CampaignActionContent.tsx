"use client";

import ActionTitle from "@/components/elements/ActionTitle";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import { useSearchParams } from "next/navigation";
import CategoryProvider from "@/contexts/CategoryContextProvider";
import { appRoutes } from "@/lib/routes";
import CampaignActionForm from "./CampaignActionForm";
import IllustrationProvider from "@/contexts/IllustrationContextProvider";

const CampaignActionContent: React.FC = () => {
    const searchParams = useSearchParams();
    const isUpdate =
        searchParams?.get("update") != null &&
        searchParams?.get("update") !== "";

    return (
        <PrivateView
            title="Campaign"
            breadCrumbItems={[
                { title: "Campaign", href: appRoutes.CAMPAIGN_INDEX_PAGE },
                {
                    title: !isUpdate ? "Add Campaign" : "Edit Campaign",
                    href: "/",
                },
            ]}
        >
            <CategoryProvider>
                <CommonContainer title="Campaign-list-section">
                    <ActionTitle
                        title={`${
                            !isUpdate ? "Add Campaign" : "Edit Campaign"
                        }`}
                    />
                    <IllustrationProvider>
                        <CampaignActionForm isUpdate={isUpdate} />
                    </IllustrationProvider>
                </CommonContainer>
            </CategoryProvider>
        </PrivateView>
    );
};

export default CampaignActionContent;
