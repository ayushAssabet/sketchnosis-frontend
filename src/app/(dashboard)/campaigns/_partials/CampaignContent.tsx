"use client";

import AppAddButton from "@/components/elements/AddButton";
import { DebouncedSearch } from "@/components/elements/DebouncedSearch";
import FilterDropdown from "@/components/elements/FilterDropDown";
import { appRoutes } from "@/lib/routes";
import Pagination from "@/components/elements/Pagination";
import PageSelector from "@/components/elements/PageSelector";
import { useGetClinicList } from "@/features/clinic/useGetClinic";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import CampaignList from "./CampaignList";

const CampaignContent: React.FC = () => {
    const { data, isLoading, mutate } = useGetClinicList();

    return (
        <div>
            <PrivateView
                title="Campaign"
                breadCrumbItems={[
                    { title: "Campaign", href: appRoutes.CAMPAIGN_INDEX_PAGE },
                ]}
            >
                <CommonContainer title="campaign-list-section">
                    <>
                        <div className="flex justify-between items-center">
                            <DebouncedSearch mutate={mutate} />
                            <div className="space-x-5">
                                <AppAddButton
                                    href={appRoutes.CAMPAIGN_ACTION_PAGE}
                                    title="Add Campaign"
                                />
                                <FilterDropdown />
                            </div>
                        </div>
                        <CampaignList CampaignList={data?.data?.data ?? []} />
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
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default CampaignContent;
