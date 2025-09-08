import { useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createApiRequest } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";

export const useRoleUser = (mutate?: () => Promise<void>) => {
  const { showToast } = useToast();
  const fetcher = createApiRequest();

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // Add new user
  const addUser = useCallback(
    async (userData: { email: string }) => {
      setIsAddingUser(true);
      try {
        const response = await fetcher.makeRequest({
          url: `${BACKEND_HOST}/v1/admin/management/users`,
          method: "POST",
          body: userData,
        });

        showToast({
          variant: "success",
          title: response.message || "User added successfully",
        });

        await mutate?.();
        return response;
      } catch (error: any) {
        console.error("Error adding user:", error);
        showToast({
          variant: "destructive",
          title: error.message || "Failed to add user",
        });
        throw error;
      } finally {
        setIsAddingUser(false);
      }
    },
    [mutate, fetcher, showToast]
  );

  // Delete user
  const deleteUser = useCallback(
    async (userId: string | number) => {
      setIsDeletingUser(true);
      try {
        const response = await fetcher.makeRequest({
          url: `${BACKEND_HOST}/v1/admin/management/users${userId}`,
          method: "DELETE",
        });

        await mutate?.();

        showToast({
          variant: "success",
          title: response.message || "User deleted successfully",
        });

        return { success: true, deletedId: userId };
      } catch (error: any) {
        console.error("Error deleting user:", error);
        showToast({
          variant: "destructive",
          title: error.message || "Failed to delete user",
        });
        throw error;
      } finally {
        setIsDeletingUser(false);
      }
    },
    [mutate, fetcher, showToast]
  );

  return {
    isAddingUser,
    isDeletingUser,
    addUser,
    deleteUser,
  };
};
