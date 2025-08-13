"use client";

import ActionTitle from "@/components/elements/ActionTitle";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import { useSearchParams } from "next/navigation";
import CategoryProvider from "@/contexts/CategoryContextProvider";
import { appRoutes } from "@/lib/routes";
import PatientActionForm from "./PatientsActionForm";

const PatientActionContent: React.FC = () => {
    const searchParams = useSearchParams();
    const isUpdate =
        searchParams?.get("update") != null &&
        searchParams?.get("update") !== "";

    return (
        <PrivateView
            title="Patient"
            breadCrumbItems={[
                { title: "Patient", href: appRoutes.PATIENT_INDEX_PAGE },
                {
                    title: !isUpdate ? "Add Patient" : "Edit Patient",
                    href: "/",
                },
            ]}
        >
            <CategoryProvider>
                <CommonContainer title="patient-list-section">
                    <ActionTitle
                        title={`${!isUpdate ? "Add Patient" : "Edit Patient"}`}
                    />
                    <PatientActionForm isUpdate={isUpdate} />
                </CommonContainer>
            </CategoryProvider>
        </PrivateView>
    );
};

export default PatientActionContent;
