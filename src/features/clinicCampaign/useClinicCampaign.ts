import { createApiRequest } from "@/helpers/fetch.helper";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { BACKEND_HOST } from "@/utils/constants";
import useConfirmDialog from "@/hooks/use-confirmation";
// import { PatientFormData } from "./patient.schema";

export const useClinicCampaign = (
    mutate?: () => Promise<void>,
    data?: any,
    isLoading?: boolean,
    isValidating?: boolean,
    error?: any
) => {
    const fetcher = createApiRequest();
    const router = useRouter();
    const { showToast } = useToast();
    const { confirm } = useConfirmDialog();

    const [isAddingClinicCampaign, setIsAddingClinicCampaign] =
        useState<boolean>(false);
    const [isUpdatingClinicCampaign, setIsUpdatingClinicCampaign] =
        useState<boolean>(false);
    const [isDeletingClinicCampaign, setIsDeletingClinicCampaign] =
        useState<boolean>(false);

    // Add new Patient
    const addClinicCampaign = useCallback(
        async (
            campaign: {
                id: string;
                startDate?: string;
            }[],
            patientId: string
        ) => {
            setIsAddingClinicCampaign(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/clinics/${patientId}/campaigns`,
                    method: "POST",
                    body: {campaign},
                });

                showToast({
                    variant: "success",
                    title:
                        response.message ||
                        "Patient Campaign added successfully",
                });
                setIsAddingClinicCampaign(false);

                // router.replace(appRoutes.PATIENT_INDEX_PAGE);
                mutate?.()
            } catch (error: any) {
                console.error("Error adding Patient:", error);
                showToast({
                    variant: "destructive",
                    title: error.message || "Failed to add Patient Campaign",
                });
                throw error;
            } finally {
                setIsAddingClinicCampaign(false);
            }
        },
        [mutate, fetcher, showToast]
    );

    // Update existing Patient
    const updateClinicCampaign = useCallback(
        async (
            campaign: Partial<{
                campaign: string;
                startDate?: string;
            }>,
            patientId: string
        ) => {
            setIsUpdatingClinicCampaign(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/clinics/${patientId}/campaigns`,
                    method: "PUT",
                    body: campaign,
                });

                showToast({
                    variant: "success",
                    title:
                        response.message ||
                        "Patient Campaign updated successfully",
                });

                setIsUpdatingClinicCampaign(false);

                // router.replace(appRoutes.PATIENT_INDEX_PAGE);
                mutate?.()


                return response;
            } catch (error: any) {
                console.error("Error updating Patient:", error);
                showToast({
                    variant: "destructive",
                    title: error.message || "Failed to update Patient",
                });
                throw error;
            } finally {
                setIsUpdatingClinicCampaign(false);
            }
        },
        [mutate, fetcher, showToast]
    );

    // Delete Patient

    const deleteClinicCampaign = useCallback(
        async ( campaignId : string | number , PatientId: string | number) => {

            setIsDeletingClinicCampaign(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/clinics/${PatientId}/campaigns`,
                    method: "DELETE",
                    body : {
                        campaignId
                    }
                });

                await mutate?.();

                showToast({
                    variant: "success",
                    title: response.message || "Patient deleted successfully",
                });

                return { success: true, deletedId: PatientId };
            } catch (error: any) {
                console.error("Error deleting Patient:", error);
                showToast({
                    variant: "destructive",
                    title: error.message || "Failed to delete Patient",
                });
                throw error;
            } finally {
                setIsDeletingClinicCampaign(false);
            }
        },
        [confirm, mutate, fetcher, showToast]
    );

    return {
        // State
        isLoading,
        isValidating,
        error,
        isAddingClinicCampaign,
        isUpdatingClinicCampaign,
        isDeletingClinicCampaign,

        // Actions
        addClinicCampaign,
        updateClinicCampaign,
        deleteClinicCampaign,
    };
};
