"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicInterface } from "@/interface/clinic.interface";
import { useClinic } from "@/features/context/useClinicActions";
import { IllustrationListTableHeading } from "./IllustrationListTableHeading";
import { useIllustration } from "@/features/illustrations/useIllustrations";

const IllustrationList = ({
    illustrationList,
    mutate , 
    isLoading
}: {
    illustrationList: Record<string, any>[];
    mutate : () => Promise<void>
    isLoading : boolean
}) => {
    const { deleteIllustration } = useIllustration();
    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={illustrationList}
                columns={IllustrationListTableHeading({
                    onDelete: deleteIllustration,
                })}
                isLoading={isLoading}
            />
        </div>
    );
};

export default IllustrationList;
