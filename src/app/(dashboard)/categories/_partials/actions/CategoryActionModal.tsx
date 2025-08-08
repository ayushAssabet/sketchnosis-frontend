import React, { useEffect, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCategoryActionForm } from "@/features/categories/useCategoryActionForm";
import { useCategory } from "@/features/categories/useCategory";
import { categoryInterface } from "@/interface/category.interface";
import LoadingButton from "@/components/elements/LoadingButton";
import AppInputField from "@/components/forms/InputField";
import AppTextArea from "@/components/forms/TextArea";

const CategoryActionModal = ({
  showModal,
  handleShowChange,
  editItem = null,
  mutate,
}: {
  showModal: boolean;
  handleShowChange: (value: boolean) => void;
  editItem?: categoryInterface | null;
  mutate: () => void;
}) => {
  const {
    formData,
    setFormData,
    setErrors,
    validateForm,
    handleChange,
    errors,
  } = useCategoryActionForm();
  const { addCategory, updateCategory, isAddingCategory, isUpdatingCategory } =
    useCategory();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateForm();
    if (!result.success) return;
    !!editItem
      ? await updateCategory(editItem?.id!, formData!)
      : await addCategory(formData!);
    handleShowChange(false);
    mutate();
  };

  const handleCancel = () => {
    handleShowChange(false);
  };

  const isEditing = !!editItem;

  useEffect(() => {
    if (showModal) {
      if (editItem) {
        setFormData({
          name: editItem.name || "",
          description: editItem.description || "",
        });
      } else {
        setFormData({
          name: "",
          description: "",
        });
      }
      setErrors({});
    }
  }, [showModal, editItem]);

  return (
    <Dialog open={showModal} onOpenChange={handleShowChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">
            {isEditing ? "Edit Area of Concern" : "Add Area of Concern"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AppInputField
            id="name"
            name="name"
            label="Area of Concern"
            className="text-sm"
            type="text"
            value={formData?.name ?? ""}
            onChange={handleChange}
            placeholder="Eg: Headache "
            error={errors?.name}
            disabled={isAddingCategory || isUpdatingCategory}
            variant="dashboard"
            required
          />

          <div className="space-y-2">
            <AppTextArea
              id="description"
              name="description"
              label="Description of Concern"
              className="text-sm"
              value={formData?.description ?? ""}
              onChange={handleChange}
              placeholder="Eg: This area of concern is related to head pain.. "
              error={errors?.description}
              disabled={isAddingCategory || isUpdatingCategory}
              variant="dashboard"
            />
          </div>

          <div className="flex justify-between pt-4">
            <div className={`flex gap-3 ml-auto`}>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-8"
              >
                Cancel
              </Button>

              <LoadingButton
                title="Area of Concern"
                isUpdate={isEditing}
                isLoading={isAddingCategory || isUpdatingCategory}
                className="!w-fit"
              />
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryActionModal;
