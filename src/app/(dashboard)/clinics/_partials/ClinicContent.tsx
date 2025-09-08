"use client";

import AppAddButton from "@/components/elements/AddButton";
import { DebouncedSearch } from "@/components/elements/DebouncedSearch";
import FilterDropdown from "@/components/elements/FilterDropDown";
import { appRoutes } from "@/lib/routes";
import ClinicList from "./ClinicList";
import Pagination from "@/components/elements/Pagination";
import PageSelector from "@/components/elements/PageSelector";
import { useGetClinicList } from "@/features/context/useGetClinic";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import { useGetAllPermissionsByUserId } from "@/features/access/hooks/usePermissions";
import { hasPermission } from "@/helpers/permission.helper";
import { permissions } from "@/utils/permissions";

const ClinicContent: React.FC = () => {
    const { data, isLoading, mutate } = useGetClinicList();
    const { data: permissionData } = useGetAllPermissionsByUserId();
    const canAdd = hasPermission(
        [permissions.ADD_CLINIC],
        permissionData?.data
    );

    return (
        <div>
            <PrivateView
                title="Clinics"
                breadCrumbItems={[
                    { title: "Clinics", href: appRoutes.CLINIC_INDEX_PAGE },
                ]}
            >
                <CommonContainer title="clinic-list-section">
                    <>
                        <div className="flex justify-between items-center">
                            <DebouncedSearch
                                mutate={mutate}
                                placeholder="Search Clinic"
                                searchKey="name"
                            />
                            {canAdd && (
                                <div className="space-x-5">
                                    <AppAddButton
                                        href={appRoutes.CLINIC_ACTION_PAGE}
                                        title="Add Clinic"
                                    />
                                    <FilterDropdown mutate={mutate} />
                                </div>
                            )}
                        </div>
                        <ClinicList
                            clinicList={data?.data?.data ?? []}
                            isLoading={isLoading}
                            mutate={mutate}
                        />
                        <div className="flex items-center justify-between mt-12">
                            <Pagination
                                currentPage={data?.data?.meta?.currentPage}
                                totalPages={data?.data?.meta?.lastPage}
                                mutate={mutate}
                            />
                            <PageSelector
                                currentCount={data?.data?.perPage}
                                totalCount={data?.data?.total}
                                mutate={mutate}
                            />
                        </div>
                    </>
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default ClinicContent;
