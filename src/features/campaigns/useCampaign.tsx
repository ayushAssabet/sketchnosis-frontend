import { createApiRequest } from "@/helpers/fetch.helper";
import { useToast } from "@/hooks/use-toast";
import { ClinicInterface } from "@/interface/clinic.interface";
import { useCallback, useMemo, useState } from "react";
// import { ClinicFormData } from "./clinic.schema";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { BACKEND_HOST } from "@/utils/constants";
import useConfirmDialog from "@/hooks/use-confirmation";
import { CampaignFormData } from "./campaign.schema";

export const useCampaign= (
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

    const [isAddingCampaign, setIsAddingCampaign] = useState<boolean>(false);
    const [isUpdatingCampaign, setIsUpdatingCampaign] =
        useState<boolean>(false);
    const [isDeletingCampaign, setIsDeletingCampaign] =
        useState<boolean>(false);

    // Add new clinic
    const addCampaign = useCallback(
        async (clinicData: Partial<CampaignFormData>) => {
            setIsAddingCampaign(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/campaign`,
                    method: "POST",
                    body: clinicData,
                });

                showToast({
                    variant: "success",
                    title: response.message || "Campaigns added successfully",
                });
                setIsAddingCampaign(false);

                router.replace(appRoutes.CLINIC_INDEX_PAGE);
            } catch (error: any) {
                console.error("Error adding clinic:", error);
                showToast({
                    variant: "destructive",
                    title: error.message || "Failed to add Campaigns",
                });
                throw error;
            } finally {
                setIsAddingCampaign(false);
            }
        },
        [mutate, fetcher, showToast]
    );

    // Update existing clinic
    const updateCampaign = useCallback(
        async (
            clinicId: string | number,
            updateData: Partial<CampaignFormData>
        ) => {
            setIsUpdatingCampaign(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/campaign/${clinicId}`,
                    method: "PUT",
                    body: updateData,
                });

                showToast({
                    variant: "success",
                    title: response.message || "Campaigns updated successfully",
                });

                setIsUpdatingCampaign(false);

                router.replace(appRoutes.CLINIC_INDEX_PAGE);

                return response;
            } catch (error: any) {
                console.error("Error updating clinic:", error);
                showToast({
                    variant: "destructive",
                    title: error.message || "Failed to update Campaigns",
                });
                throw error;
            } finally {
                setIsUpdatingCampaign(false);
            }
        },
        [mutate, fetcher, showToast]
    );

    // Delete clinic

    const deleteCampaign = useCallback(
        async (clinicId: string | number, clinicName?: string) => {
            const message = clinicName
                ? `Are you sure you want to delete "${clinicName}"? This action cannot be undone.`
                : "Are you sure you want to delete this clinic? This action cannot be undone.";

            const confirmed = await confirm({
                title: "Delete Campaigns",
                message,
                confirmText: "Delete",
                cancelText: "Cancel",
                variant: "destructive",
            });

            if (!confirmed) {
                return { success: false, cancelled: true };
            }

            setIsDeletingCampaign(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/campaign/${clinicId}`,
                    method: "DELETE",
                });

                await mutate?.();

                showToast({
                    variant: "success",
                    title: response.message || "Clinic deleted successfully",
                });

                return { success: true, deletedId: clinicId };
            } catch (error: any) {
                console.error("Error deleting clinic:", error);
                showToast({
                    variant: "destructive",
                    title: error.message || "Failed to delete clinic",
                });
                throw error;
            } finally {
                setIsDeletingCampaign(false);
            }
        },
        [confirm, mutate, fetcher, showToast]
    );

    return {
        // State
        isLoading,
        isValidating,
        error,
        isAddingCampaign,
        isUpdatingCampaign,
        isDeletingCampaign,

        // Actions
        addCampaign,
        updateCampaign,
        deleteCampaign,
    };
};
