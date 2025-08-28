import { createApiRequest } from "@/helpers/fetch.helper";
import { useToast } from "@/hooks/use-toast";
import { BACKEND_HOST } from "@/utils/constants";
import { useCallback, useState } from "react";

export const useChangeStatus = ( mutate : () => void) => {
    const fetcher = createApiRequest();
    const { showToast } = useToast();

    const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);

    const changeStatus = useCallback(async (url : string) => {
        try {
            const response = await fetcher.makeRequest({
                url,
                method: "PATCH",
            });

            showToast({
                variant: "success",
                title: response.message || "Sucessfully updated status",
            });
            setIsChangingStatus(false);
            mutate()

        } catch (error: any) {
            console.error("Error updating status", error);
            showToast({
                variant: "destructive",
                title: error.message || "Failed to update status",
            });
            throw error;
        } finally {
            setIsChangingStatus(false);
        }
    }, []);

    return {
        isChangingStatus , 
        changeStatus
    }
};
