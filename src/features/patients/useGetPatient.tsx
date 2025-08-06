"use client";
import { defaultFetcher } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const useGetPatientList = () => {
    const searchParams = useSearchParams();

    const { data, isLoading, mutate } = useSWR(
        `${BACKEND_HOST}/v1/patients${
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

export const useGetPatientDetail = (id: string | null) => {
    const { data, isLoading, mutate } = useSWR(
        id ? `${BACKEND_HOST}/v1/patients/${id}` : null,
        defaultFetcher
    );

    return {
        data,
        isLoading,
        mutate,
    };
};
