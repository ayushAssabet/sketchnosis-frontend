import CommonContainer from "@/components/elements/CommonContainer";
import { appImages } from "@/helpers/image.helper";
import { appRoutes } from "@/lib/routes";
import PrivateView from "@/views/PrivateView";
import Image from "next/image";

const DashboardIndexPage: React.FC = () => {
    return (
        <>
            <PrivateView
                title="Dashboard"
                breadCrumbItems={[
                    {
                        title: "Dashboard",
                        href: appRoutes.DASHBOARD_INDEX_PAGE,
                    },
                ]}
            >
                <CommonContainer title="clinic-list-section">
                    <div className="w-[30vw] h-[30vw] relative mx-auto">
                        <Image
                            src={appImages.commingSoon}
                            className="object-contain"
                            fill
                            alt="comming-soon"
                        />
                    </div>
                </CommonContainer>
            </PrivateView>
        </>
    );
};

export default DashboardIndexPage;
