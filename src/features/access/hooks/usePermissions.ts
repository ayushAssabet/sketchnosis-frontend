"use client";
import { defaultFetcher } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const useGetAllPermissions = () => {
    const searchParams = useSearchParams();

    const { data, isLoading, mutate } = useSWR(
        `${BACKEND_HOST}/v1/admin/management/permissions${
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

export const useGetAllPermissionsByUserId = () => {
    const { data, isLoading, mutate } = useSWR(
        `${BACKEND_HOST}/v1/admin/management/permissions-by-user-id`,
        defaultFetcher
    );

    console.log(data)

    return {
        data,
        isLoading,
        mutate,
    };
};
