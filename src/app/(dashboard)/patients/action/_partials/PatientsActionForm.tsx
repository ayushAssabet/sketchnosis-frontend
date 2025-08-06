"use client";

import LoadingButton from "@/components/elements/LoadingButton";
import AsyncSearchableDropdown from "@/components/elements/SearchableCategorySelect";
import AppInputField from "@/components/forms/InputField";
import AppTextArea from "@/components/forms/TextArea";
import { Button } from "@/components/ui/button";
import { usePatient } from "@/features/patients/usePatientAction";
import { usePatientActionForm } from "@/features/patients/usePatientActionForm";
import { useGetPatientDetail } from "@/features/patients/useGetPatient";
import { appRoutes } from "@/lib/routes";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect } from "react";
import { Label } from "@/components/ui/label";
import CampaignSelector from "@/components/elements/SelectCampaignDialog";

const PatientActionForm: React.FC<{
    isUpdate: boolean;
}> = ({ isUpdate }) => {
    const searchParams = useSearchParams();
    const patientId = searchParams.get("update");

    const { formData, handleChange, errors, setFormData, validateForm } =
        usePatientActionForm();

    const { addPatient, updatePatient, isAddingPatient, isUpdatingPatient } =
        usePatient();

    const { data, isLoading } = useGetPatientDetail(
        searchParams?.get("update")
    );

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = validateForm();
        if (!result.success) return;
        isUpdate ? updatePatient(patientId!, formData!) : addPatient(formData!);
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
        // setFormData((prev) => ({
        //     ...prev,
        //     areaOfConcernIds: selected.map((item) => item.value),
        // }));
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as unknown as "male" | "female" | "other";
        setFormData((prev) => ({
            ...prev,
            gender: value,
        }));
    };

    const handleCampaignSelect = (campaign: any, startDate: string) => {
        setFormData((prev) => ({
            ...prev,
            campaignId: campaign?.id || null,
            campaignStartDate: startDate || null,
        }));
    };

    useEffect(() => {
        if (data?.data) {
            setFormData({
                firstName: data?.data?.firstName,
                lastName: data?.data?.lastName,
                email: data?.data?.email,
                phone: data?.data?.phone,
                address: data?.data?.address,
                areaOfConcernIds: data?.data?.areaOfConcerns?.map(
                    (concern: Record<string, any>) => concern.id
                ),
                dob: data?.data?.dob,
                gender: data?.data?.gender,
                campaignId: data?.data?.campaignId,
                campaignStartDate: data?.data?.campaignStartDate,
                description: data?.data?.description,
            });
        }
    }, [data, setFormData]);

    return (
        <>
            <form
                className="grid grid-cols-2 gap-x-20 gap-y-8 py-6"
                onSubmit={handleSubmit}
            >
                <AppInputField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    className="text-sm"
                    type="text"
                    value={formData?.firstName ?? ""}
                    onChange={handleChange}
                    placeholder="Eg: John"
                    error={errors?.firstName}
                    disabled={isAddingPatient || isUpdatingPatient}
                    variant="dashboard"
                    required
                />

                <AppInputField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    className="text-sm"
                    type="text"
                    value={formData?.lastName ?? ""}
                    onChange={handleChange}
                    placeholder="Eg: Doe"
                    error={errors?.lastName}
                    disabled={isAddingPatient || isUpdatingPatient}
                    variant="dashboard"
                    required
                />

                <AppInputField
                    id="email"
                    name="email"
                    className="text-sm"
                    label="Email Address"
                    type="email"
                    value={formData?.email ?? ""}
                    onChange={handleChange}
                    placeholder="Eg: john.doe@example.com"
                    error={errors?.email}
                    disabled={isAddingPatient || isUpdatingPatient}
                    variant="dashboard"
                    required
                />

                <AppInputField
                    id="phone"
                    name="phone"
                    className="text-sm"
                    label="Phone Number"
                    type="tel"
                    value={formData?.phone ?? ""}
                    onChange={handleChange}
                    placeholder="Eg: 9745716809"
                    error={errors?.phone}
                    disabled={isAddingPatient || isUpdatingPatient}
                    variant="dashboard"
                    required
                />

                <AppInputField
                    id="address"
                    name="address"
                    className="text-sm"
                    label="Address"
                    type="text"
                    value={formData?.address ?? ""}
                    onChange={handleChange}
                    placeholder="Eg: 13th Street"
                    error={errors?.address}
                    disabled={isAddingPatient || isUpdatingPatient}
                    variant="dashboard"
                />

                <AppInputField
                    id="dob"
                    name="dob"
                    className="text-sm"
                    label="Date of Birth"
                    type="date"
                    value={formData?.dob ?? ""}
                    onChange={handleChange}
                    error={errors?.dob}
                    disabled={isAddingPatient || isUpdatingPatient}
                    variant="dashboard"
                    required
                />

                <div className="">
                    <Label className="block text-medium font-medium text-gray-700 mb-2 pt-1">
                        Gender
                        <span className="text-red-500">*</span>
                    </Label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData?.gender ?? ""}
                        onChange={handleGenderChange}
                        className="px-3 py-2 h-[42px] border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        disabled={isAddingPatient || isUpdatingPatient}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors?.gender && (
                        <span className="text-red-500 text-xs">
                            {errors.gender}
                        </span>
                    )}
                </div>

                <AsyncSearchableDropdown
                    defaultOption={defaultCategories}
                    onSelectionChange={handleAreaOfConcernsChange}
                    error={errors?.areaOfConcernIds}
                    required
                />

                <CampaignSelector
                    selectedCampaign={data?.data?.campaign}
                    selectedStartDate={formData?.campaignStartDate ?? ""}
                    onCampaignSelect={handleCampaignSelect}
                    disabled={isAddingPatient || isUpdatingPatient}
                    showStartDate
                />
                <AppInputField
                    id="campaignStartDate"
                    name="campaignStartDate"
                    className="text-sm"
                    label="Campaign Start Date"
                    type="date"
                    value={formData?.campaignStartDate ?? ""}
                    onChange={handleChange}
                    error={errors?.campaignStartDate}
                    disabled={isAddingPatient || isUpdatingPatient}
                    variant="dashboard"
                />

                <div className="col-span-2">
                    <AppTextArea
                        id="description"
                        name="description"
                        className="text-sm"
                        label="Description/Notes"
                        value={formData?.description ?? ""}
                        onChange={handleChange}
                        placeholder="Eg: Additional patient information or medical notes"
                        error={errors?.description}
                        disabled={isAddingPatient || isUpdatingPatient}
                        variant="dashboard"
                    />
                </div>

                <div></div>

                <div className="">
                    <div className="gap-5 grid grid-cols-2">
                        <Link href={appRoutes.PATIENT_INDEX_PAGE}>
                            <Button variant="outline" className="h-full w-full">
                                Cancel
                            </Button>
                        </Link>
                        <LoadingButton
                            title="Patient"
                            isLoading={isAddingPatient || isUpdatingPatient}
                            isUpdate={isUpdate}
                        />
                    </div>
                </div>
            </form>
        </>
    );
};

export default PatientActionForm;
