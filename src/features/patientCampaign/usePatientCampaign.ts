import { createApiRequest } from "@/helpers/fetch.helper";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { BACKEND_HOST } from "@/utils/constants";
import useConfirmDialog from "@/hooks/use-confirmation";
// import { PatientFormData } from "./patient.schema";

export const usePatientCampaign = (
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

    const [isAddingPatientCampaign, setIsAddingPatientCampaign] =
        useState<boolean>(false);
    const [isUpdatingPatientCampaign, setIsUpdatingPatientCampaign] =
        useState<boolean>(false);
    const [isDeletingPatientCampaign, setIsDeletingPatientCampaign] =
        useState<boolean>(false);

    // Add new Patient
    const addPatientCampaign = useCallback(
        async (
            campaign: {
                id: string;
                startDate?: string;
            }[],
            patientId: string
        ) => {
            setIsAddingPatientCampaign(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/patients/${patientId}/campaigns`,
                    method: "POST",
                    body: {campaign},
                });

                showToast({
                    variant: "success",
                    title:
                        response.message ||
                        "Patient Campaign added successfully",
                });
                setIsAddingPatientCampaign(false);

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
                setIsAddingPatientCampaign(false);
            }
        },
        [mutate, fetcher, showToast]
    );

    // Update existing Patient
    const updatePatient = useCallback(
        async (
            campaign: Partial<{
                campaign: string;
                startDate?: string;
            }>,
            patientId: string
        ) => {
            setIsUpdatingPatientCampaign(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/patients/${patientId}/campaigns`,
                    method: "PUT",
                    body: campaign,
                });

                showToast({
                    variant: "success",
                    title:
                        response.message ||
                        "Patient Campaign updated successfully",
                });

                setIsUpdatingPatientCampaign(false);

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
                setIsUpdatingPatientCampaign(false);
            }
        },
        [mutate, fetcher, showToast]
    );

    // Delete Patient

    const deletePatient = useCallback(
        async (PatientId: string | number, PatientName?: string) => {
            const message = PatientName
                ? `Are you sure you want to delete "${PatientName}"? This action cannot be undone.`
                : "Are you sure you want to delete this Patient? This action cannot be undone.";

            const confirmed = await confirm({
                title: "Delete Patient",
                message,
                confirmText: "Delete",
                cancelText: "Cancel",
                variant: "destructive",
            });

            if (!confirmed) {
                return { success: false, cancelled: true };
            }

            setIsDeletingPatientCampaign(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/patients/${PatientId}`,
                    method: "DELETE",
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
                setIsDeletingPatientCampaign(false);
            }
        },
        [confirm, mutate, fetcher, showToast]
    );

    return {
        // State
        isLoading,
        isValidating,
        error,
        isAddingPatientCampaign,
        isUpdatingPatientCampaign,
        isDeletingPatientCampaign,

        // Actions
        addPatientCampaign,
        updatePatient,
        deletePatient,
    };
};
