import { Button } from "@/components/ui/button";
import { Campaign } from "@/features/campaigns/interface/campaign.interface";
import { useClinicCampaign } from "@/features/clinicCampaign/useClinicCampaign";
import { Plus } from "lucide-react";
import { useState } from "react";
import ClinicCampaignCard from "./ClinicCampaign";
import CampaignSelector from "@/components/elements/SelectCampaignDialog";
import { BACKEND_HOST } from "@/utils/constants";

const ClinicCampaignList = ({
    mutate , 
    clinicId , 
    clinicCampaign , 
    hasViewPatient
} : {
    mutate : () => Promise<void> , 
    clinicId : string
    clinicCampaign : Record<string,any>[],
    hasViewPatient : boolean
}) => {
    const { addClinicCampaign , deleteClinicCampaign } = useClinicCampaign(mutate)
    
        // Campaign dialog state
    const [campaignDialogOpen, setCampaignDialogOpen] = useState(false);
    const [editingCampaign, setEditingCampaign] = useState<{ id: string; startDate: string } | null>(null);

    const handleCampaignSelect = async (campaign: Campaign | null, startDate: string) => {
            if (campaign) {
                try {
                    await addClinicCampaign([{
                        id : campaign?.id , 
                        startDate
                    }] , clinicId)
    
    
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
                await deleteClinicCampaign(campaignId , clinicId)
                await mutate();
                setCampaignDialogOpen(false);
                setEditingCampaign(null);
            } catch (error) {
                console.error("Error unassigning campaign:", error);
            }
        };
    return (
        <div className="my-[50px]">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-primary text-xl font-semibold">
                    Assigned Campaigns
                </h3>
                <Button
                    onClick={() => {
                        setEditingCampaign(null);
                        setCampaignDialogOpen(true);
                    }}
                    className="flex items-center space-x-2 cursor-pointer"
                >
                    <Plus className="h-4 w-4" />
                    <span>Assign Campaign</span>
                </Button>
            </div>

            <div className={hasViewPatient ? `grid grid-flow-col auto-cols-[350px] gap-4 overflow-x-auto max-w-[992px]` : `grid grid-cols-2 gap-6`}>
                {clinicCampaign?.length > 0 ? (
                    clinicCampaign.map((patientCampaign, index) => (
                        <ClinicCampaignCard
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
                            onDelete={() =>
                                handleDeleteCampaign(
                                    patientCampaign?.campaign?.id
                                )
                            }
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
                        <h4 className="text-lg font-medium mb-2">
                            No campaigns assigned
                        </h4>
                        <p className="text-sm mb-4">
                            This clinic doesn't have any campaigns assigned
                            yet.
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
            <CampaignSelector
                open={campaignDialogOpen}
                setOpen={setCampaignDialogOpen}
                selectedCampaign={editingCampaign?.id || null}
                selectedStartDate={editingCampaign?.startDate || ""}
                onCampaignSelect={handleCampaignSelect}
                showStartDate={false}
                onUnassign={
                    editingCampaign ? () => handleDeleteCampaign(editingCampaign.id) : undefined
                }
                isClinic
                url={`${BACKEND_HOST}/v1/campaign?limit=100`}
            />
        </div>
    );
};

export default ClinicCampaignList
