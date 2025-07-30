import CampaignContent from "./_partials/CampaignContent";

export async function generateMetadata() {
    return {
        title: "Campaigns List",
    };
}

const CampaignIndexPage: React.FC = () => {
    return (
        <>
            <CampaignContent />
        </>
    );
};

export default CampaignIndexPage;
