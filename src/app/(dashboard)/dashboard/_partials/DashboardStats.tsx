import React from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
} from "recharts";
import {
    Users,
    Building2,
    FileText,
    MessageSquare,
    Target,
    Activity,
    Speaker,
    Megaphone,
    Palette,
    MessageCircleMore,
    Calendar,
    PlusSquare,
} from "lucide-react";
import MultipleKPICard from "./MultipleKpiCard";
import PatientStatusDistribution from "./PieChart";
import KPICard from "./KpiCard";
import { useDashboard } from "@/features/dashboard/useDashboard";
import { lineGraphHelper, pieDataHelper } from "@/helpers/data.helper";
import LineGraph from "./LineGraph";
import HealthConditionBarChart from "./BarChartHelper";

const DashboardStats = () => {
    const { data } = useDashboard();
    console.log(data);
    // Data for charts
    const healthConditionData = [
        { condition: "Diabetes", campaigns: 2800 },
        { condition: "Hypertension", campaigns: 2500 },
        { condition: "Heart Disease", campaigns: 1600 },
        { condition: "Cancer", campaigns: 800 },
        { condition: "Obesity", campaigns: 700 },
        { condition: "Pregnancy", campaigns: 700 },
        { condition: "Brain Tumor", campaigns: 650 },
        { condition: "Gynecology", campaigns: 600 },
        { condition: "Pregnancy", campaigns: 550 },
    ];

    const patientGrowthData = [
        { month: "Jan 15", patients: 3500 },
        { month: "Feb 15", patients: 4200 },
        { month: "Mar 15", patients: 5100 },
        { month: "Apr 15", patients: 5800 },
        { month: "May 15", patients: 6500 },
        { month: "Jun 15", patients: 7200 },
        { month: "Jul 15", patients: 7800 },
        { month: "Aug 15", patients: 8400 },
    ];

    const clinicGrowthData = [
        { month: "Jan 15", clinics: 3500 },
        { month: "Feb 15", clinics: 4000 },
        { month: "Mar 15", clinics: 4800 },
        { month: "Apr 15", clinics: 5500 },
        { month: "May 15", clinics: 6200 },
        { month: "Jun 15", clinics: 6800 },
        { month: "Jul 15", clinics: 7400 },
        { month: "Aug 15", clinics: 8000 },
    ];

    return (
        <div className="">
            <div className="grid grid-cols-6 gap-2 mb-6">
                <KPICard
                    title="Registered Patients"
                    color="red"
                    icon={Users}
                    stats={data?.patientData?.total}
                />

                <KPICard
                    title="Illustration Created"
                    color="red"
                    icon={Palette}
                    stats={data?.illustrationData?.total}
                />
                <KPICard
                    title="SMS Devlivery Rate"
                    color="pink"
                    icon={MessageCircleMore}
                    stats={data?.smsSuccessRate}
                />
                <KPICard
                    title="Today's Campaign"
                    color="yellow"
                    icon={Calendar}
                    stats={data?.todaysScheduledCampaign}
                />

                {/*  */}
                <div className="row-span-2 col-span-2">
                    <PatientStatusDistribution
                        pieData={pieDataHelper(
                            data?.patientCampaignStats ?? []
                        )}
                    />
                </div>
                <div className="col-span-4 grid grid-cols-2 gap-2">
                    <MultipleKPICard
                        title="Campaign"
                        color="green"
                        icon={Megaphone}
                        stats={{
                            active: data?.campaignData?.published,
                            total: data?.campaignData?.total,
                            draft: data?.campaignData?.draft,
                        }}
                    />
                    <MultipleKPICard
                        title="Clinic"
                        color="blue"
                        icon={PlusSquare}
                        stats={{
                            active: data?.clinicStats?.active,
                            total: data?.clinicStats?.total,
                            draft: data?.clinicStats?.draft,
                        }}
                    />
                </div>
            </div>

            {/* Charts Row */}
            <div className=" space-y-4">
                {/* Health Conditions Chart - Takes 2 columns */}
                <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-sm text-gray-900 font-semibold text-center mb-6">
                        Campaigns by Health Condition
                    </h3>
                    <div className="min-h-72">
                        <HealthConditionBarChart 
                          data={data?.patientCountByCampaign ?? []} 
                          color="#3b82f6"
                          title="Patient Count by Campaign"
                          height={350}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* Patient Growth Chart */}
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

                    {/* Clinic Growth Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-sm text-gray-900 font-semibold text-center mb-6">
                            Clinic Growth Over Time
                        </h3>
                        <div className="h-64">
                            <LineGraph
                                data={lineGraphHelper(
                                    data?.clinicsGrowthOverTime ?? ([] as any),
                                    "clinics"
                                )}
                                dataKey="clinics"
                                strokeColor="#3b82f6"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardStats;
