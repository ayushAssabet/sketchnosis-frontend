import { use } from "react";
import CampaignDetailProfileContent from "./_partials/CampaignDetailProfileContent";

const CamapignDetailIndexPage = ({params}) => {
    const slug : Record<string,any> = use(params);
    return <CampaignDetailProfileContent id={slug?.id} />;
}

export default CamapignDetailIndexPage