import { use } from "react";
import ProfileContent from "./_partials/ProfileContent";

const ClinicIndividualPage = ({params}) => {

    const slug : Record<string,any> = use(params);
    return <ProfileContent id={slug?.id} />;
    
};

export default ClinicIndividualPage;
