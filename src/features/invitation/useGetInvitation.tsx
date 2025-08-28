import { useUserDeviceId } from "@/hooks/use-deviceId";
import { BACKEND_HOST } from "@/utils/constants";
import useSWR from "swr";

export const useGetInvitation = (id: string) => {
    const { deviceId } = useUserDeviceId();
    const fetcher = async (url: string) => {
        const response = await fetch(url, {
            headers: {
                Accept: "application/json",
                "visitor-key": deviceId,
            },
        });

        if (response.status === 401) {
            //   clearTokens()
            window.location.href = "/forbidden?user=true";
        }
        if (response.status === 404) {
            //   clearTokens()
            window.location.href = "/404?user=true";
        }
        if (response.status === 400) {
            //   clearTokens()
            window.location.href = "/404?user=true";
        }
        return response.json();
    };
    const { data, isLoading } = useSWR(
        `${BACKEND_HOST}/v1/patient/invite/${id}`,
        fetcher
    );
    return {
        data: data?.data,
        isLoading,
    };
};
