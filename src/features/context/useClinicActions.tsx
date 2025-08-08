import { createApiRequest } from '@/helpers/fetch.helper';
import { useToast } from '@/hooks/use-toast';
import { ClinicInterface } from '@/interface/clinic.interface';
import { useCallback, useMemo, useState } from 'react';
import { ClinicFormData } from './clinic.schema';
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/lib/routes';
import { BACKEND_HOST } from '@/utils/constants';
import useConfirmDialog from '@/hooks/use-confirmation';

export const useClinic = (
  mutate?: () => Promise<void>, 
  data?: any, isLoading?: 
  boolean, isValidating?: 
  boolean, error?: any
) => {
  
  const fetcher = createApiRequest();
  const router = useRouter();
  const { showToast } = useToast();
  const { confirm  } = useConfirmDialog()

  const [isAddingClinic, setIsAddingClinic] = useState<boolean>(false);
  const [isUpdatingClinic, setIsUpdatingClinic] = useState<boolean>(false);
  const [isDeletingClinic, setIsDeletingClinic] = useState<boolean>(false);

  // Add new clinic
  const addClinic = useCallback(async (clinicData: Partial<ClinicFormData>) => {
    setIsAddingClinic(true);
    try {
      const response = await fetcher.makeRequest({
        url: `${BACKEND_HOST}/v1/clinics`, 
        method: 'POST',
        body: clinicData
      });

      showToast({
        variant: 'success',
        title: response.message || 'Clinic added successfully'
      });
      setIsAddingClinic(false)

      router.replace(appRoutes.CLINIC_INDEX_PAGE)

    } catch (error: any) {
      console.error('Error adding clinic:', error);
      showToast({
        variant: 'destructive',
        title: error.message || 'Failed to add clinic'
      });
      throw error;
    } finally {
      setIsAddingClinic(false);
    }
  }, [mutate, fetcher, showToast]);

  // Update existing clinic
  const updateClinic = useCallback(async (clinicId: string | number, updateData: Partial<ClinicFormData>) => {
    setIsUpdatingClinic(true);
    try {
      const response = await fetcher.makeRequest({
        url: `${BACKEND_HOST}/v1/clinics/${clinicId}`,
        method: 'PUT',
        body: updateData
      });

      showToast({
        variant: 'success',
        title: response.message || 'Clinic updated successfully'
      });

      setIsUpdatingClinic(false)

      router.replace(appRoutes.CLINIC_INDEX_PAGE)

      return response;
    } catch (error: any) {
      console.error('Error updating clinic:', error);
      showToast({
        variant: 'destructive',
        title: error.message || 'Failed to update clinic'
      });
      throw error;
    } finally {
      setIsUpdatingClinic(false);
    }
  }, [mutate, fetcher, showToast]);

  // Delete clinic

const deleteClinic = useCallback(async (clinicId: string | number, clinicName?: string) => {
    const message = clinicName
      ? `Are you sure you want to delete "${clinicName}"? This action cannot be undone.`
      : 'Are you sure you want to delete this clinic? This action cannot be undone.';
    
    const confirmed = await confirm({
      title: "Delete Clinic",
      message,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "destructive"
    });
    
    if (!confirmed) {
      return { success: false, cancelled: true };
    }
    
    setIsDeletingClinic(true);
    try {
      const response = await fetcher.makeRequest({
        url: `${BACKEND_HOST}/v1/clinics/${clinicId}`,
        method: 'DELETE'
      });
      
      await mutate?.();
      
      showToast({
        variant: 'success',
        title: response.message || 'Clinic deleted successfully'
      });
      
      return { success: true, deletedId: clinicId };
    } catch (error: any) {
      console.error('Error deleting clinic:', error);
      showToast({
        variant: 'destructive',
        title: error.message || 'Failed to delete clinic'
      });
      throw error;
    } finally {
      setIsDeletingClinic(false);
    }
  }, [confirm, mutate, fetcher, showToast]);


  return {
    
    // State
    isLoading,
    isValidating,
    error,
    isAddingClinic,
    isUpdatingClinic,
    isDeletingClinic,
    
    // Actions
    addClinic,
    updateClinic,
    deleteClinic,
  };
};