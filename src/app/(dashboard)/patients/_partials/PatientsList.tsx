"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicInterface } from "@/interface/clinic.interface";
import { PatientListTableHeading } from "./PatientsListTableHeading";
import { usePatient } from "@/features/patients/usePatientAction";

const PatientList = ({
    patientList,
    isLoading,
    mutate,
}: {
    patientList: ClinicInterface[];
    isLoading: boolean;
    mutate: () => Promise<void>;
}) => {
    const { deletePatient } = usePatient(mutate);
    
    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={patientList}
                isLoading={isLoading}
                columns={PatientListTableHeading({ onDelete: deletePatient , mutate })}
            />
        </div>
    );
};

export default PatientList;
