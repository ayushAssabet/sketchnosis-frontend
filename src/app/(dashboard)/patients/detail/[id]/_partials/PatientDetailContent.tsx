"use client";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import { appRoutes } from "@/lib/routes";
import { useGetPatientDetail } from "@/features/patients/useGetPatient";
import PatientDetailProfileHeader from "./PatientDetailHeader";
import PatientCampaignCard from "./PatientCampaignCard";
import { Campaign } from "@/features/campaigns/interface/campaign.interface";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CampaignSelector from "@/components/elements/SelectCampaignDialog";
import { usePatientCampaign } from "@/features/patientCampaign/usePatientCampaign";
import { BACKEND_HOST } from "@/utils/constants";
import { useAuth } from "@/features/login/context/AuthContextProvider";

const PatientDetailProfileContent = ({ id }: { id: string }) => {
    const { data, isLoading, mutate } = useGetPatientDetail(id);
    const { addPatientCampaign , deletePatientCampaign } = usePatientCampaign(mutate)
    const { user } = useAuth();

    // Campaign dialog state
    const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<{ id: string; startDate: string } | null>(null);

    // Handler for campaign assignment
    const handleCampaignSelect = async (campaign: Campaign | null, startDate: string) => {
        if (campaign) {
            try {
                await addPatientCampaign([{
                    id : campaign?.id , 
                    startDate
                }] , id)


                await mutate();
                setCampaignDialogOpen(false);
                setEditingCampaign(null);
            } catch (error) {
                console.error("Error assigning campaign:", error);
            }
        }
    };

    const handleDeleteCampaign = async (campaignId: string) => {
        try {
            await deletePatientCampaign(campaignId , id)
            await mutate();
            setCampaignDialogOpen(false);
            setEditingCampaign(null);
        } catch (error) {
            console.error("Error unassigning campaign:", error);
        }
    };

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>
            <PrivateView
                title="Patients"
                breadCrumbItems={[
                    { title: "Patients", href: appRoutes.PATIENT_INDEX_PAGE },
                    { title: "Patient Detail", href: appRoutes.CAMPAIGN_INDEX_PAGE },
                ]}
            >
                <CommonContainer title="campaign-list-section">
                    <div className="py-10 px-12">
                        <PatientDetailProfileHeader entity={data?.data} />

                        {/* Campaign Assignment Section */}
                        <div className="my-[50px]">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-primary text-xl font-semibold">Assigned Campaigns</h3>
                                <Button
                                    onClick={() => {
                                        setEditingCampaign(null);
                                        setCampaignDialogOpen(true);
                                    }}
                                    className="flex items-center space-x-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Assign Campaign</span>
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {data?.data?.patientCampaigns?.length > 0 ? (
                                    data.data.patientCampaigns.map((patientCampaign, index) => (
                                        <PatientCampaignCard
                                            key={index}
                                            campaign={patientCampaign?.campaign}
                                            startDate={patientCampaign?.startDate}
                                            onEdit={() => {
                                                setEditingCampaign({
                                                    id: patientCampaign?.campaign?.id,
                                                    startDate: patientCampaign?.startDate,
                                                });
                                                setCampaignDialogOpen(true);
                                            }}
                                            onDelete={() => handleDeleteCampaign(patientCampaign?.campaign?.id)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        <div className="mb-4">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                                />
                                            </svg>
                                        </div>
                                        <h4 className="text-lg font-medium mb-2">No campaigns assigned</h4>
                                        <p className="text-sm mb-4">
                                            This patient doesn't have any campaigns assigned yet.
                                        </p>
                                        <Button
                                            onClick={() => {
                                                setEditingCampaign(null);
                                                setCampaignDialogOpen(true);
                                            }}
                                            className="flex items-center space-x-2 mx-auto"
                                        >
                                            <Plus className="h-4 w-4" />
                                            <span>Assign First Campaign</span>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CommonContainer>
            </PrivateView>

            {/* Single Campaign Selector Dialog (used for both assign + edit) */}
            <CampaignSelector
                open={campaignDialogOpen}
                setOpen={setCampaignDialogOpen}
                selectedCampaign={editingCampaign?.id || null}
                selectedStartDate={editingCampaign?.startDate || ""}
                onCampaignSelect={handleCampaignSelect}
                showStartDate={true}
                onUnassign={
                    editingCampaign ? () => handleDeleteCampaign(editingCampaign.id) : undefined
                }
                url={user?.clinicId ? `${BACKEND_HOST}/v1/clinics/campaign/${user?.clinicId}` : undefined}
            />
        </>
    );
};

export default PatientDetailProfileContent;
