import { PageProps } from "@/utils/type";
import CampaignActionContent from "./_partials/CampaignActionContent";

export async function generateMetadata({ searchParams }: PageProps) {
    const resolvedSearchParams = await searchParams;
    const isUpdate =
        resolvedSearchParams?.update != null &&
        resolvedSearchParams.update !== "";

    return {
        title: isUpdate ? "UPDATE CAMPAIGN" : "ADD CAMPAIGN",
    };
}

const CampaignActions: React.FC = () => {
    return (
        <>
            <CampaignActionContent />
        </>
    );
};

export default CampaignActions;
