"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicInterface } from "@/interface/clinic.interface";
import { ClinicDetailPatientListTableHeading } from "./PatientHeading";

const PatientList = ({ patientList }: { patientList: ClinicInterface[] }) => {
    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={patientList}
                columns={ClinicDetailPatientListTableHeading()}
            />
        </div>
    );
};

export default PatientList;
