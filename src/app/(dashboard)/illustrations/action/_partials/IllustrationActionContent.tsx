"use client";

import ActionTitle from "@/components/elements/ActionTitle";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import { useSearchParams } from "next/navigation";
import CategoryProvider from "@/contexts/CategoryContextProvider";
import { appRoutes } from "@/lib/routes";
import IllustrationActionForm from "./IllustrationActionForm";

const IllustrationActionContent: React.FC = () => {
  const searchParams = useSearchParams();
  const isUpdate =
    searchParams?.get("update") != null && searchParams?.get("update") !== "";

  return (
    <PrivateView
      title="Illustrations"
      breadCrumbItems={[
        { title: "Illustration", href: appRoutes.ILLUSTRATIONS_INDEX_PAGE },
        {
          title: !isUpdate ? "Add Illustrations" : "Edit Illustrations",
          href: "/",
        },
      ]}
    >
      <CategoryProvider>
        <CommonContainer title="illustration-list-section">
          <ActionTitle
            title={`${!isUpdate ? "Add Illustration" : "Edit Illustration"}`}
          />
          <IllustrationActionForm isUpdate={isUpdate} />
        </CommonContainer>
      </CategoryProvider>
    </PrivateView>
  );
};

export default IllustrationActionContent;
