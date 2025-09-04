"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicInterface } from "@/interface/clinic.interface";
import { ClinicDetailPatientListTableHeading } from "./PatientHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { appRoutes } from "@/lib/routes";
import { Plus } from "lucide-react";

const PatientList = ({ patientList }: { patientList: ClinicInterface[] }) => {
    return (
        <div className="min-h-[60vh]">
            <h3 className="text-primary text-xl font-semibold flex justify-between items-center">
                <span>Patients List</span>
                <Link href={appRoutes.PATIENT_ACTION_PAGE}>
                    <Button className="flex items-center space-x-2 mx-auto cursor-pointer">
                        <Plus className="h-4 w-4" />
                        <span>Enroll Patients</span>
                    </Button>
                </Link>
            </h3>
            {patientList?.length > 0 ? (
                <DataTable
                    data={patientList}
                    columns={ClinicDetailPatientListTableHeading()}
                />
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
                        No patients enrolled
                    </h4>
                    <p className="text-sm mb-4">
                        This clinic doesn't have any patient enrolled yet.
                    </p>
                    <Link href={appRoutes.PATIENT_ACTION_PAGE}>
                        <Button className="flex items-center space-x-2 mx-auto">
                            <Plus className="h-4 w-4" />
                            <span>Enroll First Patient</span>
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default PatientList;
