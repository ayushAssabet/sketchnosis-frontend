import { createApiRequest } from "@/helpers/fetch.helper";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { BACKEND_HOST } from "@/utils/constants";
import useConfirmDialog from "@/hooks/use-confirmation";
import { IllustrationFormData } from "./illustration.schema";

export const useIllustration = (
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

    const [isAddingIllustration, setIsAddingIllustration] =
        useState<boolean>(false);
    const [isUpdatingIllustration, setIsUpdatingIllustration] =
        useState<boolean>(false);
    const [isDeletingIllustration, setIsDeletingIllustration] =
        useState<boolean>(false);

    const addIllustration = useCallback(
        async (IllustrationData: Partial<IllustrationFormData>) => {
            setIsAddingIllustration(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/illustration`,
                    method: "POST",
                    body: IllustrationData,
                });

                showToast({
                    variant: "success",
                    title:
                        response.message || "Illustration added successfully",
                });
                setIsAddingIllustration(false);

                router.replace(appRoutes.ILLUSTRATIONS_INDEX_PAGE);
            } catch (error: any) {
                console.error("Error adding Illustration:", error);
                showToast({
                    variant: "destructive",
                    title: error.message || "Failed to add Illustration",
                });
                throw error;
            } finally {
                setIsAddingIllustration(false);
            }
        },
        [mutate, fetcher, showToast]
    );

    // Update existing Illustration
    const updateIllustration = useCallback(
        async (
            IllustrationId: string | number,
            updateData: Partial<IllustrationFormData>
        ) => {
            setIsUpdatingIllustration(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/illustration/${IllustrationId}`,
                    method: "PUT",
                    body: updateData,
                });

                showToast({
                    variant: "success",
                    title:
                        response.message || "Illustration updated successfully",
                });

                setIsUpdatingIllustration(false);

                router.replace(appRoutes.ILLUSTRATIONS_INDEX_PAGE);

                return response;
            } catch (error: any) {
                console.error("Error updating Illustration:", error);
                showToast({
                    variant: "destructive",
                    title: error.message || "Failed to update Illustration",
                });
                throw error;
            } finally {
                setIsUpdatingIllustration(false);
            }
        },
        [mutate, fetcher, showToast]
    );

    // Delete Illustration
    const deleteIllustration = useCallback(
        async (IllustrationId: string | number) => {
            setIsDeletingIllustration(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/illustration/${IllustrationId}`,
                    method: "DELETE",
                });

                await mutate?.();

                showToast({
                    variant: "success",
                    title:
                        response.message || "Illustration deleted successfully",
                });

                return { success: true, deletedId: IllustrationId };
            } catch (error: any) {
                console.error("Error deleting Illustration:", error);
                showToast({
                    variant: "destructive",
                    title: error.message || "Failed to delete Illustration",
                });
                throw error;
            } finally {
                setIsDeletingIllustration(false);
            }
        },
        [confirm, mutate, fetcher, showToast]
    );

    return {
        // State
        isLoading,
        isValidating,
        error,
        isAddingIllustration,
        isUpdatingIllustration,
        isDeletingIllustration,

        // Actions
        addIllustration,
        updateIllustration,
        deleteIllustration,
    };
};
