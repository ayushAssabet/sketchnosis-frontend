import LoadingButton from "@/components/elements/LoadingButton";
import AsyncSearchableDropdown from "@/components/elements/SearchableCategorySelect";
import AppDropZone from "@/components/forms/DropZone";
import AppInputField from "@/components/forms/InputField";
import AppTextArea from "@/components/forms/TextArea";
import { Button } from "@/components/ui/button";
import { useClinicActionForm } from "@/features/context/useClinicActionForm";
import { useClinic } from "@/features/context/useClinicActions";
import { useGetClinicDetail } from "@/features/context/useGetClinic";
import { appRoutes } from "@/lib/routes";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo } from "react";

const ClinicActionForm: React.FC<{
    isUpdate: boolean;
}> = ({ isUpdate }) => {
    const searchParams = useSearchParams();
    const clinicId = searchParams.get("update");

    const { formData, handleChange, errors, setFormData, validateForm } =
        useClinicActionForm();

    const { addClinic, updateClinic, isAddingClinic, isUpdatingClinic } =
        useClinic();

    const { data, isLoading } = useGetClinicDetail(searchParams?.get("update"));

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = validateForm();
        if (!result.success) return;
        isUpdate ? updateClinic(clinicId!, formData!) : addClinic(formData!);
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
        setFormData((prev) => ({
            ...prev,
            [key]: file,
        }));
    };

    useEffect(() => {
        if (data?.data) {
            console.log(data?.data?.areaOfConcerns);
            setFormData({
                name: data?.data?.name,
                areaOfConcernIds: data?.data?.areaOfConcerns?.map(
                    (concern: Record<string, any>, index: number) => concern.id
                ),
                description: data?.data?.description,
                email: data?.data?.email,
                address: data?.data?.address,
                contactPersonName: data?.data?.contactPersonName,
                phone: data?.data?.phone,
                // Don't set logo here since it's handled by the dropzone
            });
        }
    }, [data]);

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
                    id="name"
                    name="name"
                    label="Clinic Name"
                    className="text-sm"
                    type="text"
                    value={formData?.name ?? ""}
                    onChange={handleChange}
                    placeholder="Eg: Sketchnosis "
                    error={errors?.name}
                    disabled={isAddingClinic || isUpdatingClinic}
                    variant="dashboard"
                    required
                />
                <AsyncSearchableDropdown
                    defaultOption={defaultCategories}
                    onSelectionChange={handleAreaOfConcernsChange}
                    error={errors?.areaOfConcernIds}
                    required
                />

                <AppInputField
                    id="email"
                    name="email"
                    className=" text-sm"
                    label="Email"
                    type="text"
                    value={formData?.email ?? ""}
                    onChange={handleChange}
                    placeholder="Eg: Sketchnosis@sketchnosis.com"
                    error={errors?.email}
                    disabled={isAddingClinic || isUpdatingClinic}
                    variant="dashboard"
                    required
                    readonly={isUpdate}
                />
                <AppInputField
                    id="address"
                    name="address"
                    className=" text-sm"
                    label="Address"
                    type="text"
                    value={formData?.address ?? ""}
                    onChange={handleChange}
                    placeholder="Eg: 13th Street "
                    error={errors?.address}
                    disabled={isAddingClinic || isUpdatingClinic}
                    variant="dashboard"
                />
                <AppInputField
                    id="contactPersonName"
                    name="contactPersonName"
                    className=" text-sm"
                    label="Contact Person Name"
                    type="text"
                    value={formData?.contactPersonName ?? ""}
                    onChange={handleChange}
                    placeholder="Eg: David Stan"
                    error={errors?.contactPersonName}
                    disabled={isAddingClinic || isUpdatingClinic}
                    variant="dashboard"
                    required
                />
                <AppInputField
                    id="phone"
                    name="phone"
                    className=" text-sm"
                    label="Contact Person Number"
                    type="number"
                    value={formData?.phone ?? ""}
                    onChange={handleChange}
                    placeholder="Eg: 9745716809 "
                    error={errors?.phone}
                    disabled={isAddingClinic || isUpdatingClinic}
                    variant="dashboard"
                    required
                    readonly={isUpdate}
                />
                <div className="col-span-2">
                    <AppTextArea
                        id="description"
                        name="description"
                        className=" text-sm"
                        label="Clinic Description"
                        value={formData?.description ?? ""}
                        onChange={handleChange}
                        placeholder="Eg: Work on orthopedics"
                        error={errors?.description}
                        disabled={isAddingClinic || isUpdatingClinic}
                        variant="dashboard"
                    />
                </div>
                <div className="col-span-2">
                    <AppDropZone
                        name="logo"
                        label="Clinic Logo"
                        handleFileChange={handleFileChange}
                        currentFile={formData?.logo}
                        currentUrl={data?.data?.logo} // Pass the existing logo URL
                        isUpdateMode={isUpdate}
                        variant="dashboard"
                    />
                </div>
                <div></div>

                <div className="">
                    <div className="gap-5 grid grid-cols-2">
                        <Link href={appRoutes.CLINIC_INDEX_PAGE}>
                            <Button variant="outline" className="h-full w-full">
                                Cancel
                            </Button>
                        </Link>
                        <LoadingButton
                            title="Clinic"
                            isLoading={isAddingClinic || isUpdatingClinic}
                            isUpdate={isUpdate}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default ClinicActionForm;
