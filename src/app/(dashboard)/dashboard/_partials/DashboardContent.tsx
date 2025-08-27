'use client'
import CommonContainer from "@/components/elements/CommonContainer";
import { appRoutes } from "@/lib/routes";
import PrivateView from "@/views/PrivateView";
import DashboardStats from "./DashboardStats";

const DashboardContent: React.FC = () => {
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
                <section id={'dashboard'} className="p-5 pb-24">
                    <div className=" w-full rounded-2xl min-h-[80vh] p-5 max-w-[95%] mx-auto">
                        <DashboardStats />  
                    </div>
                </section>
            </PrivateView>
        </>
    );
};

export default DashboardContent