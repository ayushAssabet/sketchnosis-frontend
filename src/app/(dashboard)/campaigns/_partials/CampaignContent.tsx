"use client";

import AppAddButton from "@/components/elements/AddButton";
import { DebouncedSearch } from "@/components/elements/DebouncedSearch";
import FilterDropdown from "@/components/elements/FilterDropDown";
import { appRoutes } from "@/lib/routes";
import Pagination from "@/components/elements/Pagination";
import PageSelector from "@/components/elements/PageSelector";
import CommonContainer from "@/components/elements/CommonContainer";
import PrivateView from "@/views/PrivateView";
import CampaignList from "./CampaignList";
import { useCampaignsList } from "@/features/campaigns/hooks/useGetCampaigns";

const CampaignContent: React.FC = () => {
    const { data, isLoading, mutate } = useCampaignsList();

    return (
        <div>
            <PrivateView
                title="Campaigns"
                breadCrumbItems={[
                    { title: "Campaigns", href: appRoutes.CAMPAIGN_INDEX_PAGE },
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
                                currentPage={data?.data?.meta.currentPage}
                                totalPages={data?.data?.meta.lastPage}
                                onPageChange={() => {}}
                            />
                            <PageSelector
                                currentCount={data?.data?.meta.perPage}
                                totalCount={data?.data?.meta.total}
                                onCountChange={() => {}}
                            />
                        </div>
                    </>
                </CommonContainer>
            </PrivateView>
        </div>
    );
};

export default CampaignContent;
