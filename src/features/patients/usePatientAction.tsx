import { createApiRequest } from "@/helpers/fetch.helper";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { BACKEND_HOST } from "@/utils/constants";
import useConfirmDialog from "@/hooks/use-confirmation";
import { PatientFormData } from "./patient.schema";

export const usePatient = (
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

  const [isAddingPatient, setIsAddingPatient] = useState<boolean>(false);
  const [isUpdatingPatient, setIsUpdatingPatient] = useState<boolean>(false);
  const [isDeletingPatient, setIsDeletingPatient] = useState<boolean>(false);
  const [isCreatingBulkPatient , setIsCreatingBulkPatient] = useState<boolean>(false)

  // Add new Patient
  const addPatient = useCallback(
    async (patientData: Partial<PatientFormData>) => {
      setIsAddingPatient(true);
      try {
        const response = await fetcher.makeRequest({
          url: `${BACKEND_HOST}/v1/patients`,
          method: "POST",
          body: patientData,
        });

        showToast({
          variant: "success",
          title: response.message || "Patient added successfully",
        });
        setIsAddingPatient(false);

        router.replace(appRoutes.PATIENT_INDEX_PAGE)
      } catch (error: any) {
        console.error("Error adding Patient:", error);
        showToast({
          variant: "destructive",
          title: error.message || "Failed to add Patient",
        });
        throw error;
      } finally {
        setIsAddingPatient(false);
      }
    },
    [mutate, fetcher, showToast]
  );

  const bulkCreatePatients = useCallback(
    async (file: File) => {
      setIsCreatingBulkPatient(true);
      try {
        const formData = new FormData();
        formData.append("patientList", file);

        const response = await fetcher.makeRequest({
          url: `${BACKEND_HOST}/v1/patients/bulk-upload`,
          method: "POST",
          body: formData,
        });

        await mutate?.();

        showToast({
          variant: "success",
          title: response.message || "Patients imported successfully",
        });

        router.replace(appRoutes.PATIENT_INDEX_PAGE);
        return response;
      } catch (error: any) {
        console.error("Error bulk creating Patients:", error);
        showToast({
          variant: "destructive",
          title: error.message || "Failed to import Patients",
        });
        throw error;
      } finally {
        setIsCreatingBulkPatient(false);
      }
    },
    [mutate, fetcher, showToast, router]
  );

  // Update existing Patient
  const updatePatient = useCallback(
    async (
      PatientId: string | number,
      updateData: Partial<PatientFormData>
    ) => {
      setIsUpdatingPatient(true);
      try {
        const response = await fetcher.makeRequest({
          url: `${BACKEND_HOST}/v1/patients/${PatientId}`,
          method: "PUT",
          body: updateData,
        });

        console.log(response)

        showToast({
          variant: "success",
          title: response.message || "Patient updated successfully",
        });

        setIsUpdatingPatient(false);

        router.replace(appRoutes.PATIENT_INDEX_PAGE);

        return response;
      } catch (error: any) {
        console.error("Error updating Patient:", error);
        showToast({
          variant: "destructive",
          title: error.message || "Failed to update Patient",
        });
        throw error;
      } finally {
        setIsUpdatingPatient(false);
      }
    },
    [mutate, fetcher, showToast]
  );

  // Delete Patient

  const deletePatient = useCallback(
    async (PatientId: string | number) => {

      setIsDeletingPatient(true);
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
        setIsDeletingPatient(false);
      }
    },
    [confirm, mutate, fetcher, showToast]
  );

  return {
    // State
    isLoading,
    isValidating,
    error,
    isAddingPatient,
    isUpdatingPatient,
    isDeletingPatient,
    isCreatingBulkPatient,

    // Actions
    addPatient,
    updatePatient,
    deletePatient,
    bulkCreatePatients
  };
};
