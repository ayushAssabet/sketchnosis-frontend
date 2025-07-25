"use client";
import { defaultFetcher } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const useGetCategoriesList = () => {
    const searchParams = useSearchParams();

    const { data, isLoading, mutate } = useSWR(
        `${BACKEND_HOST}/v1/area-of-concern${
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
