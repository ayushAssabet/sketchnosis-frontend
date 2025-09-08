"use client";
import useSWR from "swr";
import { defaultFetcher } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";

export const useGetUserRoleList = () => {
    const defaultUrl = `${BACKEND_HOST}/v1/admin/management/users`;
    const { data, isLoading, mutate } = useSWR(
        defaultUrl , 
        defaultFetcher
    );
    return {
        data,
        isLoading,
        mutate,
    };
};