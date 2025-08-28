"use client";

import AppAddButton from "@/components/elements/AddButton";
import { DebouncedSearch } from "@/components/elements/DebouncedSearch";
import FilterDropdown from "@/components/elements/FilterDropDown";
import { appRoutes } from "@/lib/routes";
import Pagination from "@/components/elements/Pagination";
import PageSelector from "@/components/elements/PageSelector";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import PatientList from "./PatientsList";
import { useGetPatientList } from "@/features/patients/useGetPatient";
import { useGetAllPermissionsByUserId } from "@/features/access/hooks/usePermissions";
import { permissions } from "@/utils/permissions";
import { hasPermission } from "@/helpers/permission.helper";

const PatientListContent: React.FC = () => {
    const { data, isLoading, mutate } = useGetPatientList();
    const { data : permissionData } = useGetAllPermissionsByUserId()

    
    console.log(data)
    return (
        <div>
            <PrivateView
                title="Patients"
                breadCrumbItems={[
                    { title: "Patients", href: appRoutes.PATIENT_INDEX_PAGE },
                ]}
            >
                <CommonContainer title="patient-list-section">
                    <>
                        <div className="flex justify-between items-center">
                            <DebouncedSearch
                                mutate={mutate}
                                placeholder="Search Patient"
                                searchKey="name"
                            />
                            <div className="space-x-5">
                                {
                                    hasPermission([permissions.ADD_PATIENT] , permissionData?.data) &&
                                    <AppAddButton
                                        href={appRoutes.PATIENT_ACTION_PAGE}
                                        title="Add Patient"
                                    />
                                }
                                <FilterDropdown mutate={mutate}/>
                            </div>
                        </div>
                        <PatientList patientList={data?.data?.data ?? []} isLoading={isLoading} mutate={mutate} />
                        <div className="flex items-center justify-between mt-12">
                            <Pagination
                                currentPage={data?.data?.meta?.currentPage}
                                totalPages={data?.data?.meta?.lastPage}
                                mutate={mutate}
                            />
                            <PageSelector
                                currentCount={data?.data?.meta?.perPage}
                                totalCount={data?.data?.meta?.total}
                                mutate={mutate}
                            />
                        </div>
                    </>
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default PatientListContent;
