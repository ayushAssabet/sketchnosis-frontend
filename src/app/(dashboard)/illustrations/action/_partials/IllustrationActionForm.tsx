import LoadingButton from "@/components/elements/LoadingButton";
import AsyncSearchableDropdown from "@/components/elements/SearchableCategorySelect";
import AppDropZone from "@/components/forms/DropZone";
import AppInputField from "@/components/forms/InputField";
import AppTextArea from "@/components/forms/TextArea";
import { Button } from "@/components/ui/button";
import { useGetIllustrationDetail } from "@/features/illustrations/useGetIllustrationDetail";
import { useIllusrationActionForm } from "@/features/illustrations/useIllustrationActionForm";
import { useIllustration } from "@/features/illustrations/useIllustrations";
import { viewImage } from "@/helpers/viewImage.helper";
import { Loader } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const IllustrationActionForm: React.FC<{
    isUpdate: boolean;
}> = ({ isUpdate }) => {
    const searchParams = useSearchParams();
    const clinicId = searchParams.get("update");

    const [blobURL, setBlobURL] = useState<string | undefined>();

    const { formData, handleChange, errors, setFormData, validateForm } =
        useIllusrationActionForm();

    const {
        addIllustration,
        updateIllustration,
        isAddingIllustration,
        isUpdatingIllustration,
    } = useIllustration();

    const { data, isLoading } = useGetIllustrationDetail(
        searchParams?.get("update")
    );

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = validateForm();
        if (!result.success) return;
        isUpdate
            ? updateIllustration(clinicId!, formData!)
            : addIllustration(formData!);
    };

    const defaultCategories =
        data?.data?.areaOfConcerns?.map(
            (category: Record<string, any>, index: number) => ({
                label: category?.name,
                value: category?.id,
            })
        ) ?? [];

    const handleAreaOfConcernsChange = (
        selected: { label: string; value: string }[]
    ) => {
        setFormData((prev) => ({
            ...prev,
            areaOfConcernIds: selected.map((item) => item.value),
        }));
    };

    const handleFileChange = (key: string, file: any | null) => {
        console.log(file);
        setFormData((prev) => ({
            ...prev,
            [key]: file,
        }));
    };

    useEffect(() => {
        const fetchViewImage = async (fileURL: string) => {
            const url = `http://localhost:4001/v1/illustration/view-illustration?url=${fileURL}`;
            const blobUrl = await viewImage(url);
            if (blobUrl) {
                setBlobURL(blobUrl);
            }
        };

        if (data?.data) {
            console.log(data?.data?.areaOfConcerns);
            setFormData({
                title: data?.data?.title,
                areaOfConcernIds: data?.data?.areaOfConcerns,
                description: data?.data?.description,
            });

            fetchViewImage(data?.data?.fileUrl);
        }
    }, [data]);

    console.log(formData);

    if (isLoading) {
        return <Loader className="animate-spin duration-300 repeat-infinite" />;
    }

    return (
        <>
            <form
                className="grid grid-cols-2 gap-x-20 gap-y-8 py-6"
                onSubmit={handleSubmit}
            >
                <AppInputField
                    id="title"
                    name="title"
                    label="Illustration Name"
                    className="text-sm"
                    type="text"
                    value={formData?.title ?? ""}
                    onChange={handleChange}
                    placeholder="Eg: Tuberculosis "
                    error={errors?.name}
                    disabled={isAddingIllustration || isUpdatingIllustration}
                    variant="dashboard"
                    required
                />
                <AsyncSearchableDropdown
                    defaultOption={defaultCategories}
                    onSelectionChange={handleAreaOfConcernsChange}
                    error={errors?.areaOfConcernIds}
                    required
                />

                <div className="col-span-2">
                    <AppDropZone
                        name="illustration"
                        label="Illustration"
                        handleFileChange={handleFileChange}
                        currentFile={formData?.illustration}
                        currentUrl={blobURL} // Pass the existing logo URL
                        isUpdateMode={isUpdate}
                        variant="dashboard"
                        required
                    />
                </div>
                <div className="col-span-2">
                    <AppTextArea
                        id="description"
                        name="description"
                        className=" text-sm"
                        label="Description"
                        value={formData?.description ?? ""}
                        onChange={handleChange}
                        placeholder="Eg: Work on orthopedics"
                        error={errors?.description}
                        disabled={
                            isAddingIllustration || isUpdatingIllustration
                        }
                        variant="dashboard"
                    />
                </div>

                <div></div>

                <div className="">
                    <div className="gap-5 grid grid-cols-2">
                        <Button variant="outline" className="h-full w-full">
                            Cancel
                        </Button>
                        <LoadingButton
                            title="Clinic"
                            isLoading={
                                isAddingIllustration || isUpdatingIllustration
                            }
                            isUpdate={isUpdate}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default IllustrationActionForm;
