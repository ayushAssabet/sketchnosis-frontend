'use client'
import { useToast } from "@/hooks/use-toast";
import { BACKEND_HOST } from "@/utils/constants";
import { useCallback, useState } from "react";
import { ProfileFormData } from "../interface/profile.interface";
import { createApiRequest } from "@/helpers/fetch.helper";

export const useProfile = (mutate? : () => void) => {
    
    const { showToast } = useToast();
    const fetcher = createApiRequest();
    
    
    const [isProfileUpdating , setIsProfileUpdating] = useState<boolean>(false);
    const [isEditingProfilePicture , setIsEditingProfilePicture] = useState<boolean>(false)
    const [isDeleteProfilePicture , setIsDeletingProfilePicture] = useState<boolean>(false)



    const updateProfile = useCallback(
        async (profileData: Partial<ProfileFormData>) => {
            setIsProfileUpdating(true);
            try {
                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/user/profile`,
                    method: "PUT",
                    body: profileData,
                });

                showToast({
                    variant: "success",
                    description:
                        response.message || "Profile updated successfully",
                });

                mutate?.();
            } catch (error: any) {
                console.error("Error updating profile:", error);
                showToast({
                    variant: "destructive",
                    description: error.message || "Failed to update profile",
                });
                throw error;
            } finally {
                setIsProfileUpdating(false);
            }
        },
        [mutate, fetcher, showToast]
    );

    // Edit Profile Picture
    const editProfilePicture = useCallback(
        async (file: File) => {
            setIsEditingProfilePicture(true);
            try {
                const formData = new FormData();
                formData.append("profilePicture", file);

                const response = await fetcher.makeRequest({
                    url: `${BACKEND_HOST}/v1/user/profile/picture`,
                    method: "PUT",
                    body: formData,
                });

                showToast({
                    variant: "success",
                    description:
                        response.message ||
                        "Profile picture updated successfully",
                });

                mutate?.();
            } catch (error: any) {
                console.error("Error editing profile picture:", error);
                showToast({
                    variant: "destructive",
                    description:
                        error.message || "Failed to edit profile picture",
                });
                throw error;
            } finally {
                setIsEditingProfilePicture(false);
            }
        },
        [mutate, fetcher, showToast]
    );

    // Delete Profile Picture
    const deleteProfilePicture = useCallback(async () => {
        setIsDeletingProfilePicture(true);
        try {
            const response = await fetcher.makeRequest({
                url: `${BACKEND_HOST}/v1/user/profile/picture`,
                method: "DELETE",
            });

            showToast({
                variant: "success",
                description:
                    response.message || "Profile picture deleted successfully",
            });

            mutate?.();
        } catch (error: any) {
            console.error("Error deleting profile picture:", error);
            showToast({
                variant: "destructive",
                description:
                    error.message || "Failed to delete profile picture",
            });
            throw error;
        } finally {
            setIsDeletingProfilePicture(false);
        }
    }, [mutate, fetcher, showToast]);


    return {

        updateProfile , 
        deleteProfilePicture , 
        editProfilePicture , 
        isEditingProfilePicture , 
        isDeleteProfilePicture , 
        isProfileUpdating

    }
};
