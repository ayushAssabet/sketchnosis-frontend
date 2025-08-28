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
import { appRoutes } from "@/lib/routes";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

const IllustrationActionForm: React.FC<{
    isUpdate: boolean;
}> = ({ isUpdate }) => {
    const searchParams = useSearchParams();
    const clinicId = searchParams.get("update");

    const [blobURL, setBlobURL] = useState<string | undefined>();

    const { data, isLoading } = useGetIllustrationDetail(
        searchParams?.get("update")
    );

    const { formData, handleChange, errors, setFormData, validateForm } =
        useIllusrationActionForm(data?.data);

    const {
        addIllustration,
        updateIllustration,
        isAddingIllustration,
        isUpdatingIllustration,
    } = useIllustration();

    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = validateForm();

        console.log(result)
        if (!result.success) return;
        isUpdate
            ? updateIllustration(clinicId!, formData!)
            : addIllustration(formData!);
    };

    const defaultCategories = useMemo(() => {
        return (
            data?.data?.areaOfConcerns?.map(
                (category: Record<string, any>) => ({
                    label: category?.name,
                    value: category?.id,
                })
            ) ?? []
        );
    }, [data]);

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
            const url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/v1/illustration/view-illustration?url=${fileURL}`;
            const blobUrl = await viewImage(url);
            if (blobUrl) {
                setBlobURL(blobUrl);
            }
        };

        if (data?.data) {
            console.log(data?.data?.areaOfConcerns);
            setFormData({
                title: data?.data?.title,
                areaOfConcernIds: data?.data?.areaOfConcerns?.map((data) => data?.id),
                description: data?.data?.description,
            });

            fetchViewImage(data?.data?.fileUrl);
        }
    }, [data]);


    if (isLoading) {
        return <Loader className="animate-spin duration-300 repeat-infinite" />;
    }

    console.log(data)

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
                    error={errors?.title}
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
                        currentUrl={data?.data?.fileUrl} // Pass the existing logo URL
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
                        <Link href={appRoutes.ILLUSTRATIONS_INDEX_PAGE}>
                            <Button variant="outline" className="h-full w-full">
                                Cancel
                            </Button>
                        </Link>
                        <LoadingButton
                            title="Illustration"
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
