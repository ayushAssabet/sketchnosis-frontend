"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicListTableHeading } from "./ClinicListTableHeading";
import { ClinicInterface } from "@/interface/clinic.interface";
import { useClinic } from "@/features/context/useClinicActions";

const ClinicList = ({
    clinicList,
    isLoading,
}: {
    clinicList: ClinicInterface[];
    isLoading: boolean;
}) => {
    const { deleteClinic } = useClinic();
    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={clinicList}
                columns={ClinicListTableHeading({ onDelete: deleteClinic })}
                isLoading={isLoading}
            />
        </div>
    );
};

export default ClinicList;
