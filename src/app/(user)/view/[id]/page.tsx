import { use } from "react";
import UserContent from "./_partials/UserContent";

const UserViewCampaignIndexPage = ({params}) => {
    const slug : Record<string,any> = use(params)
    return <UserContent  id={slug?.id}/>;
};

export default UserViewCampaignIndexPage;
