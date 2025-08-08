"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicInterface } from "@/interface/clinic.interface";
import { useClinic } from "@/features/context/useClinicActions";
import { CampaignListTableHeading } from "./CampaignListHeading";

const CampaignList = ({
    CampaignList,
}: {
    CampaignList: ClinicInterface[];
}) => {
    const { deleteClinic } = useClinic();
    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={CampaignList}
                columns={CampaignListTableHeading({ onDelete: deleteClinic })}
            />
        </div>
    );
};

export default CampaignList;
