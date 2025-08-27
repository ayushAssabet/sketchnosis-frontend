import { userFetcher } from "@/helpers/fetch.helper";
import { useUserDeviceId } from "@/hooks/use-deviceId";
import { BACKEND_HOST } from "@/utils/constants";
import useSWR from "swr";

export const useViewCampaign = (id: string) => {
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
            window.location.href = "/";
        }
        return response.json();
    };

    const { data, error, isLoading } = useSWR(
        id ? `${BACKEND_HOST}/v1/patient/view-campaign/${id}` : null,
        fetcher
    );

    console.log(data, id);
    return {
        data,
        isLoading,
    };
};
