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

const IllustrationContent: React.FC = () => {
    const { mutateIllustration, illustration } =
        useContext(IllustrationContext);
    return (
        <>
            <div className="flex justify-between items-center">
                <DebouncedSearch mutate={mutateIllustration} />
                <div className="space-x-5">
                    <AppAddButton
                        href={appRoutes.ILLUSTRATIONS_ACTION_PAGE}
                        title="Add illustration"
                    />
                    <FilterDropdown />
                </div>
            </div>
            <IllustrationList illustrationList={illustration ?? []} />
            <div className="flex items-center justify-between mt-12">
                <Pagination
                    currentPage={2}
                    totalPages={3}
                    onPageChange={() => {}}
                />
                <PageSelector
                    currentPage={2}
                    totalPages={10}
                    onPageChange={() => {}}
                />
            </div>
        </>
    );
};

export default IllustrationContent;
