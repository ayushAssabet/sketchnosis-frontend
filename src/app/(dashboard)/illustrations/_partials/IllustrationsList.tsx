'use client'

import DataTable from "@/components/common/DataTable/DataTable"
import { ClinicInterface } from "@/interface/clinic.interface"
import { useClinic } from "@/features/clinic/useClinicActions"
import { IllustrationListTableHeading } from "./IllustrationListTableHeading"

const IllustrationList = ({
    illustrationList
} : {
    illustrationList : Record<string,any>[]
}) => {
    const { deleteClinic } = useClinic()
    return(
        <div className="min-h-[60vh]">
            <DataTable 
                data={illustrationList}
                columns={IllustrationListTableHeading({onDelete : deleteClinic})}
            />
        </div>
    )
}

export default IllustrationList