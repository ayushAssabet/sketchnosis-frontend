"use client";
import { defaultFetcher } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const useCampaignsList = () => {
    const searchParams = useSearchParams();
    const { data, isLoading, mutate } = useSWR(
        `${BACKEND_HOST}/v1/campaign${
            searchParams?.toString() == "" ? "" : `?${searchParams?.toString()}`
        }`,
        defaultFetcher
    );
    return {
        data,
        isLoading,
        mutate,
    };
};

export const useGetCampaignDetail = (id : string | null) => {
    
    const { data , isLoading , mutate } = useSWR(
        id ?`${BACKEND_HOST}/v1/campaign/${id}` : null,
        defaultFetcher
    )
     
    return  {
        data , isLoading , mutate
    }
}
