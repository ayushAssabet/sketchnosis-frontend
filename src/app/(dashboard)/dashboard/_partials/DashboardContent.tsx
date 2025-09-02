'use client'
import CommonContainer from "@/components/elements/CommonContainer";
import { appRoutes } from "@/lib/routes";
import PrivateView from "@/views/PrivateView";
import DashboardStats from "./DashboardStats";
import { useAuth } from "@/features/login/context/AuthContextProvider";
import ClinicDashboardStats from "./ClinicDashboardStats";

const DashboardContent: React.FC = () => {
    const { user } = useAuth()
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
                        {
                            user?.role == 'clinic' ? 
                            <ClinicDashboardStats /> :
                            <DashboardStats /> 
                        }
                    </div>
                </section>
            </PrivateView>
        </>
    );
};

export default DashboardContent