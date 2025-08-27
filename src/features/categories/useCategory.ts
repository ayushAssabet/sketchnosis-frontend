import { createApiRequest } from '@/helpers/fetch.helper';
import { useToast } from '@/hooks/use-toast';
import { useCallback,useState } from 'react';
import { useRouter } from 'next/navigation';
import { appRoutes } from '@/lib/routes';
import { CategoryFormData } from './category.schema';
import { categoryInterface } from '@/interface/category.interface';
import { BACKEND_HOST } from '@/utils/constants';

export const useCategory = (mutate?: () => Promise<void>, data?: any, isLoading?: boolean, isValidating?: boolean, error?: any) => {
  
  const fetcher = createApiRequest();
  const router = useRouter();
  const { showToast } = useToast();

  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [isUpdatingCategory, setIsUpdatingCategory] = useState<boolean>(false);
  const [isDeletingCategory, setIsDeletingCategory] = useState<boolean>(false);

  // Add new category
  const addCategory = useCallback(async (categoryData: Partial<CategoryFormData>) => {
    setIsAddingCategory(true);
    try {
      const response = await fetcher.makeRequest({
        url: `${BACKEND_HOST}/v1/area-of-concern`, 
        method: 'POST',
        body: categoryData
      });

      showToast({
        variant: 'success',
        description: response.message || 'category added successfully'
      });
      setIsAddingCategory(false)
      mutate?.()
      return response
    } catch (error: any) {
      console.error('Error adding category:', error);
      showToast({
        variant: 'destructive',
        description: error.message || 'Failed to add category'
      });
      throw error;
    } finally {
      setIsAddingCategory(false);
    }
  }, [mutate, fetcher, showToast]);

  // Update existing category
  const updateCategory = useCallback(async (categoryId: string | number, updateData: Partial<CategoryFormData>) => {
    setIsUpdatingCategory(true);
    try {
      const response = await fetcher.makeRequest({
        url: `${BACKEND_HOST}/v1/area-of-concern/${categoryId}`,
        method: 'PUT',
        body: updateData
      });

      showToast({
        variant: 'success',
        description: response.message || 'category updated successfully'
      });

      setIsUpdatingCategory(false)
      mutate?.()

      return response;
    } catch (error: any) {
      console.error('Error updating category:', error);
      showToast({
        variant: 'destructive',
        description: error.message || 'Failed to update category'
      });
      throw error;
    } finally {
      setIsUpdatingCategory(false);
    }
  }, [mutate, fetcher, showToast]);

  const deleteCategory = useCallback(async (categoryId: string | number) => {
    setIsDeletingCategory(true);
    try {
      const response = await fetcher.makeRequest({
        url: `${BACKEND_HOST}/v1/area-of-concern/${categoryId}`,
        method: 'DELETE'
      });

      showToast({
        variant: 'success',
        description: response.message || 'category deleted successfully'
      });

      await mutate?.();

      return { success: true, deletedId: categoryId };
    } catch (error: any) {
      console.error('Error deleting category:', error);
      showToast({
        variant: 'destructive',
        description: error.message || 'Failed to delete category'
      });
      throw error;
    } finally {
      setIsDeletingCategory(false);
    }
  }, [mutate, fetcher, showToast]);
  

  return {
    
    // State
    isLoading,
    isValidating,
    error,
    isAddingCategory,
    isUpdatingCategory,
    isDeletingCategory,
    
    // Actions
    addCategory,
    updateCategory,
    deleteCategory,
  };
};