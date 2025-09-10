"use client";
import { defaultFetcher } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const useGetClinicList = (url? : string) => {
    const searchParams = useSearchParams();
    const defaultUrl = `${BACKEND_HOST}/v1/clinics${
            searchParams?.toString() == "" ? "" : `?${searchParams?.toString()}`
        }`
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

export const useGetClinicDetail = (id: string | null) => {
    const { data, isLoading, mutate } = useSWR(
        id ? `${BACKEND_HOST}/v1/clinics/${id}` : null,
        defaultFetcher
    );

    return {
        data,
        isLoading,
        mutate,
    };
};

export const useGetClinicDetailWithPatients = (id: string | null) => {
    const { data, isLoading, mutate } = useSWR(
        id ? `${BACKEND_HOST}/v1/clinics/detail-with-patient/${id}` : null,
        defaultFetcher
    );

    return {
        data,
        isLoading,
        mutate,
    };
};
