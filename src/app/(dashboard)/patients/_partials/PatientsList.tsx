"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicInterface } from "@/interface/clinic.interface";
import { useClinic } from "@/features/context/useClinicActions";
import { PatientListTableHeading } from "./PatientsListTableHeading";

const PatientList = ({ patientList }: { patientList: ClinicInterface[] }) => {
    const { deleteClinic } = useClinic();
    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={patientList}
                columns={PatientListTableHeading({ onDelete: deleteClinic })}
            />
        </div>
    );
};

export default PatientList;
