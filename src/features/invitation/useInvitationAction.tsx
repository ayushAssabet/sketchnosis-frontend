import { createApiRequest } from "@/helpers/fetch.helper";
import { useToast } from "@/hooks/use-toast";
import { appRoutes } from "@/lib/routes";
import { BACKEND_HOST } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const useInvitationAction = () => {
    const router = useRouter();
    const { showToast } = useToast();
    const fetcher = createApiRequest();

    const [isAcceptingInvitation, setIsAcceptingInvitation] =
        useState<boolean>(false);
    const [isDecliningInvitation, setIsDecliningInvitation] =
        useState<boolean>(false);

    const acceptInvitation = useCallback(
        async (deviceId: string, campaignId: string) => {
            try {
                const res = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/patient/accept/${campaignId}`,
                    method: "POST",
                    body: {
                        status: "accepted",
                    },
                    headers: {
                        "visitor-key": deviceId,
                    },
                });

                showToast({
                    variant: "success",
                    description: res?.message,
                });
                setIsAcceptingInvitation(false);
                router.replace(
                    appRoutes.INVITATION_SUCCESS_INDEX_PAGE + "?action=success"
                );
            } catch (error: any) {
                console.error("Accepting invitation failed", error);
                showToast({
                    variant: "destructive",
                    description: error?.message,
                });
                throw error;
            } finally {
                setIsAcceptingInvitation(false);
            }
        },
        []
    );

    const declineInvitation = useCallback(
        async (deviceId: string, campaignId: string) => {
            try {
                const res = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/patient/accept/${campaignId}`,
                    method: "POST",
                    body: {
                        status: "denied",
                    },
                    headers: {
                        "visitor-key": deviceId,
                    },
                });
                showToast({
                    variant: "success",
                    description: res?.message,
                });

                setIsDecliningInvitation(false);
                router.replace(
                    appRoutes.INVITATION_SUCCESS_INDEX_PAGE + "?action=denied"
                );
            } catch (error: any) {
                console.error("Accepting invitation failed", error);
                showToast({
                    variant: "destructive",
                    description: error?.message,
                });
                throw error;
            } finally {
                setIsDecliningInvitation(false);
            }
        },
        []
    );

    return {
        acceptInvitation,
        isAcceptingInvitation,
        declineInvitation,
        isDecliningInvitation,
    };
};
