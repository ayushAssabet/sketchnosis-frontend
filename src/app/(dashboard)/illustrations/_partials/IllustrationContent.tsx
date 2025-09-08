"use client";
import AppAddButton from "@/components/elements/AddButton";
import { DebouncedSearch } from "@/components/elements/DebouncedSearch";
import FilterDropdown from "@/components/elements/FilterDropDown";
import Pagination from "@/components/elements/Pagination";
import PageSelector from "@/components/elements/PageSelector";
import IllustrationList from "./IllustrationsList";
import { appRoutes } from "@/lib/routes";
import { useGetAllIllustration } from "@/features/illustrations/useGetIllustrationDetail";
import { useGetAllPermissionsByUserId } from "@/features/access/hooks/usePermissions";
import { permissions } from "@/utils/permissions";
import { hasPermission } from "@/helpers/permission.helper";

const IllustrationContent: React.FC = () => {
    const { mutate, data, isLoading } = useGetAllIllustration();

    const { data: permissionData } = useGetAllPermissionsByUserId();
    const canAdd = hasPermission(
        [permissions.ADD_ILLUSTRATION],
        permissionData?.data
    );

    return (
        <>
            <div className="flex justify-between items-center">
                <DebouncedSearch mutate={mutate} searchKey={"name"} />
                <div className="space-x-5">
                    {canAdd && (
                        <AppAddButton
                            href={appRoutes.ILLUSTRATIONS_ACTION_PAGE}
                            title="Add illustration"
                        />
                    )}
                    <FilterDropdown />
                </div>
            </div>
            <IllustrationList
                illustrationList={data?.data?.data ?? []}
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
                    currentCount={data?.data?.meta?.currentPage}
                    totalCount={data?.data?.meta?.currentPage}
                    mutate={mutate}
                />
            </div>
        </>
    );
};

export default IllustrationContent;
