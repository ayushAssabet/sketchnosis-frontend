"use client";

import { appRoutes } from "@/lib/routes";
import { useGetClinicList } from "@/features/clinic/useGetClinic";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import IllustrationContent from "./IllustrationContent";
import IllustrationProvider from "@/contexts/IllustrationContextProvider";
import dynamic from "next/dynamic";

const DynamicIllustrationWrapper = dynamic(
    () => import("./IllustrationContent"),
    {
        ssr: false,
    }
);

const IllustrationProviderWrapper: React.FC = () => {
    return (
        <div>
            <PrivateView
                title="illustration"
                breadCrumbItems={[
                    {
                        title: "Illustration",
                        href: appRoutes.ILLUSTRATIONS_ACTION_PAGE,
                    },
                ]}
            >
                <CommonContainer title="illustration-list-section">
                    <IllustrationProvider>
                        <DynamicIllustrationWrapper />
                    </IllustrationProvider>
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default IllustrationProviderWrapper;
