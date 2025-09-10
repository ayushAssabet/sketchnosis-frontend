import React from "react";
import { Users, Megaphone } from "lucide-react";
import KPICard from "./KpiCard";
import {
    useClinicDashboard,
    useDashboard,
} from "@/features/dashboard/useDashboard";
import { lineGraphHelper, pieDataHelper } from "@/helpers/data.helper";
import LineGraph from "./LineGraph";
import ClinicDashboardCampaignList from "./ClinicDashboardCampaignList";

const ClinicDashboardStats = () => {
    const { data } = useClinicDashboard();

    return (
        <div className="">
            <div className="grid grid-cols-2 gap-4 mb-4">
                <KPICard
                    title="Registered Patients"
                    color="red"
                    icon={Users}
                    stats={data?.patientCountAddedByClinic}
                />
                <KPICard
                    title="Total Campaign"
                    color="yellow"
                    icon={Megaphone}
                    stats={data?.totalCampaigns}
                />
            </div>

            <div className=" grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-sm text-gray-900 font-semibold text-center mb-6">
                        Patient Growth Over Time
                    </h3>
                    <div className="h-64">
                        <LineGraph
                            data={lineGraphHelper(
                                data?.patientsGrowthOverTime ?? [],
                                "patients"
                            )}
                            dataKey="patients"
                            strokeColor="#3b82f6"
                        />
                    </div>
                </div>

                <div className="bg-white py-6 px-4 rounded-lg shadow-sm">
                    <h3 className="text-sm text-gray-900 font-semibold text-center mb-6">
                        Campaigns List
                    </h3>
                    <div className="h-64 overflow-y-auto px-2">
                        <ClinicDashboardCampaignList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClinicDashboardStats;
