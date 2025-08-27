"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicInterface } from "@/interface/clinic.interface";
import { useClinic } from "@/features/context/useClinicActions";
import { CampaignListTableHeading } from "./CampaignListHeading";

const CampaignList = ({
    CampaignList,
    isLoading
}: {
    CampaignList: ClinicInterface[];
    isLoading : boolean
}) => {
    const { deleteClinic } = useClinic();
    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={CampaignList}
                columns={CampaignListTableHeading({ onDelete: deleteClinic })}
                isLoading={isLoading}
            />
        </div>
    );
};

export default CampaignList;
