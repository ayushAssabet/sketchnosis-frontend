"use client";

import ActionTitle from "@/components/elements/ActionTitle";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import ClinicActionForm from "./ClinicActionForm";
import { useSearchParams } from "next/navigation";
import CategoryProvider from "@/contexts/CategoryContextProvider";
import { appRoutes } from "@/lib/routes";

const ClinicActionContent: React.FC = () => {
  const searchParams = useSearchParams();
  const isUpdate =
    searchParams?.get("update") != null && searchParams?.get("update") !== "";

  return (
    <PrivateView
      title="Clinics"
      breadCrumbItems={[
        { title: "Clinics", href: appRoutes.CLINIC_INDEX_PAGE },
        { title: !isUpdate ? "Add Clinic" : "Edit Clinic", href: "/" },
      ]}
    >
      <CategoryProvider>
        <CommonContainer title="clinic-list-section">
          <ActionTitle title={`${!isUpdate ? "Add Clinic" : "Edit Clinic"}`} />
          <ClinicActionForm isUpdate={isUpdate} />
        </CommonContainer>
      </CategoryProvider>
    </PrivateView>
  );
};

export default ClinicActionContent;
