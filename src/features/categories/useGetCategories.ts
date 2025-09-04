"use client";
import { defaultFetcher } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const useGetCategoriesList = (url?  :String) => {
    const searchParams = useSearchParams();
    const defaultUrl =`${BACKEND_HOST}/v1/area-of-concern${
            searchParams?.toString() == "" ? "" : `?${searchParams?.toString()}`}`
    const { data, isLoading, mutate } = useSWR(
        url ?? defaultUrl,
        defaultFetcher
    );

    return {
        data,
        isLoading,
        mutate,
    };
};
