"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { ClinicInterface } from "@/interface/clinic.interface";
import { useClinic } from "@/features/context/useClinicActions";
import { IllustrationListTableHeading } from "./IllustrationListTableHeading";
import { useIllustration } from "@/features/illustrations/useIllustrations";
import { useChangeStatus } from "@/features/changeStatus/hooks/useChangeStatus";

const IllustrationList = ({
    illustrationList,
    mutate , 
    isLoading
}: {
    illustrationList: Record<string, any>[];
    mutate : () => Promise<void>
    isLoading : boolean
}) => {
    const { deleteIllustration } = useIllustration(mutate);
    const { changeStatus } = useChangeStatus(mutate)
    return (
        <div className="min-h-[60vh]">
            <DataTable
                data={illustrationList}
                columns={IllustrationListTableHeading({
                    onDelete: deleteIllustration,
                    changeStatus
                })}
                isLoading={isLoading}
            />
        </div>
    );
};

export default IllustrationList;
