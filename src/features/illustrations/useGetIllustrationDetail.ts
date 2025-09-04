import { defaultFetcher } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const useGetIllustrationDetail = (id: string | null) => {
    const { data, isLoading, mutate } = useSWR(
        id ? `${BACKEND_HOST}/v1/illustration/${id}` : null,
        defaultFetcher
    );

    return {
        data,
        isLoading,
        mutate,
    };
};

export const useGetAllIllustration = () => {
    const searchParams = useSearchParams();
    const defaultUrl = `${BACKEND_HOST}/v1/illustration${
        searchParams?.toString() == "" ? "" : `?${searchParams?.toString()}`
    }`;
    const { data, isLoading, mutate } = useSWR(defaultUrl, defaultFetcher);

    return {
        data,
        isLoading,
        mutate,
    };
};
