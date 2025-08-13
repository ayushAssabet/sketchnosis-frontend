"use client";
import { defaultFetcher } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const useGetAllRoles = () => {
    
    const searchParams = useSearchParams();

    const { data, isLoading, mutate } = useSWR(
        `${BACKEND_HOST}/v1/admin/management/role${
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

