"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicInterface } from "@/interface/clinic.interface";
import { CampaignListTableHeading } from "./CampaignListHeading";
import { useCampaign } from "@/features/campaigns/hooks/useCampaign";
import { useChangeStatus } from "@/features/changeStatus/hooks/useChangeStatus";

const CampaignList = ({
    CampaignList,
    isLoading,
    mutate
}: {
    CampaignList: ClinicInterface[];
    isLoading : boolean
    mutate : () => Promise<void>
}) => {
    const { deleteCampaign } = useCampaign(mutate);
    const { changeStatus } = useChangeStatus(mutate)
    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={CampaignList}
                columns={CampaignListTableHeading({ onDelete: deleteCampaign , changeStatus })}
                isLoading={isLoading}
            />
        </div>
    );
};

export default CampaignList;
