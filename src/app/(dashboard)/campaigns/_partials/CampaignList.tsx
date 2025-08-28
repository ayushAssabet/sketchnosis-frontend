"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicInterface } from "@/interface/clinic.interface";
import { useClinic } from "@/features/context/useClinicActions";
import { CampaignListTableHeading } from "./CampaignListHeading";
import { useCampaign } from "@/features/campaigns/hooks/useCampaign";

const CampaignList = ({
    CampaignList,
    isLoading,
    mutate
}: {
    CampaignList: ClinicInterface[];
    isLoading : boolean
    mutate : () => Promise<void>
}) => {
    const { deleteCampaign } = useCampaign();
    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={CampaignList}
                columns={CampaignListTableHeading({ onDelete: deleteCampaign })}
                isLoading={isLoading}
            />
        </div>
    );
};

export default CampaignList;
