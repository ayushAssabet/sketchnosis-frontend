"use client";
import AppAddButton from "@/components/elements/AddButton";
import { DebouncedSearch } from "@/components/elements/DebouncedSearch";
import FilterDropdown from "@/components/elements/FilterDropDown";
import Pagination from "@/components/elements/Pagination";
import PageSelector from "@/components/elements/PageSelector";
import IllustrationList from "./IllustrationsList";
import { useContext } from "react";
import { IllustrationContext } from "@/contexts/IllustrationContextProvider";
import { appRoutes } from "@/lib/routes";
import { mutate } from "swr";
import { useGetAllIllustration } from "@/features/illustrations/useGetIllustrationDetail";

const IllustrationContent: React.FC = () => {

    const { mutate , data , isLoading } = useGetAllIllustration(); 

    return (
        <>
            <div className="flex justify-between items-center">
                <DebouncedSearch mutate={mutate} searchKey={'name'} />
                <div className="space-x-5">
                    <AppAddButton
                        href={appRoutes.ILLUSTRATIONS_ACTION_PAGE}
                        title="Add illustration"
                    />
                    <FilterDropdown />
                </div>
            </div>
            <IllustrationList illustrationList={data?.data?.data ?? []} isLoading={isLoading} mutate={mutate} />
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
