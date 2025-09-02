"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicListTableHeading } from "./ClinicListTableHeading";
import { ClinicInterface } from "@/interface/clinic.interface";
import { useClinic } from "@/features/context/useClinicActions";
import { useClinicCampaign } from "@/features/clinicCampaign/useClinicCampaign";

const ClinicList = ({
    clinicList,
    isLoading,
    mutate
}: {
    clinicList: ClinicInterface[];
    isLoading: boolean;
    mutate : () => Promise<void>
}) => {
    const { deleteClinic } = useClinic(mutate);
    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={clinicList}
                columns={ClinicListTableHeading({ onDelete: deleteClinic , mutate : mutate })}
                isLoading={isLoading}
            />
        </div>
    );
};

export default ClinicList;
