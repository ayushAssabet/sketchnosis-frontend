import { use } from "react";
import PatientDetailProfileContent from "./_partials/PatientDetailContent";

const PatientDetailPage = ({params}) => {

    const slug : Record<string,any> = use(params);
    return <PatientDetailProfileContent id={slug?.id} />;
    
};

export default PatientDetailPage;
