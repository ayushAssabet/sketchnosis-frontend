"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo } from "react";

import LoadingButton from "@/components/elements/LoadingButton";
import AsyncSearchableDropdown from "@/components/elements/SearchableCategorySelect";
import AppInputField from "@/components/forms/InputField";
import AppTextArea from "@/components/forms/TextArea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PhoneInputField from "@/components/forms/PhoneField";

import { appRoutes } from "@/lib/routes";
import { BACKEND_HOST } from "@/utils/constants";

import { usePatient } from "@/features/patients/usePatientAction";
import { usePatientActionForm } from "@/features/patients/usePatientActionForm";
import { useGetPatientDetail } from "@/features/patients/useGetPatient";
import { useAuth } from "@/features/login/context/AuthContextProvider";
import { useGetClinicList } from "@/features/context/useGetClinic";

const PatientActionForm: React.FC<{
    isUpdate: boolean;
}> = ({ isUpdate }) => {
    const searchParams = useSearchParams();
    const patientId = searchParams.get("update");

    const { user } = useAuth();

    const {
        formData,
        handleChange,
        errors,
        setFormData,
        validateForm,
        handleGenderChange,
        handlePhoneChange,
        handleAreaOfConcernsChange,
        handleClinicChange,
    } = usePatientActionForm(user.role);

    const { addPatient, updatePatient, isAddingPatient, isUpdatingPatient } =
        usePatient();

    const { data, isLoading } = useGetPatientDetail(
        searchParams?.get("update")
    );

    const { data: clinicData } = useGetClinicList(
        `${BACKEND_HOST}/v1/clinics?limit=100`
    );

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = validateForm();
        if (!result.success) return;
        isUpdate ? updatePatient(patientId!, formData!) : addPatient(formData!);
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

    useEffect(() => {
        if (data?.data && patientId) {
            setFormData({
                firstName: data?.data?.firstName,
                lastName: data?.data?.lastName,
                email: data?.data?.email,
                phone: data?.data?.phone,
                areaOfConcernIds: data?.data?.areaOfConcerns?.map(
                    (concern: Record<string, any>) => concern.id
                ),
                dob: data?.data?.dob,
                gender: data?.data?.gender,
                description: data?.data?.description,
            });
        }
    }, [data, setFormData]);

    console.log(formData);

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

                <AsyncSearchableDropdown
                    defaultOption={defaultCategories}
                    onSelectionChange={handleAreaOfConcernsChange}
                    error={errors?.areaOfConcernIds}
                    required
                    url={
                        user?.clinicId
                            ? `${BACKEND_HOST}/v1/clinics/areaOfConcerns/${user?.clinicId}`
                            : undefined
                    }
                />

                <PhoneInputField
                    id="phone"
                    name="phone"
                    className="text-sm"
                    label="Phone Number"
                    value={formData?.phone ?? ""}
                    onChange={handlePhoneChange}
                    placeholder="Eg: 9745716809"
                    error={errors?.phone}
                    disabled={isAddingPatient || isUpdatingPatient}
                    variant="dashboard"
                    required
                    readOnly={isUpdate}
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
                    readonly={isUpdate}
                    required
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
                    max={new Date().toISOString().split("T")[0]}
                    disabled={isAddingPatient || isUpdatingPatient}
                    variant="dashboard"
                />

                <div className="">
                    <Label className="block text-medium font-medium text-gray-700 mb-2 pt-1">
                        Gender
                        {/* <span className="text-red-500">*</span> */}
                    </Label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData?.gender ?? ""}
                        onChange={handleGenderChange}
                        className="px-3 py-2 h-[42px] border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        disabled={
                            isAddingPatient || isUpdatingPatient || isUpdate
                        }
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

                {user.role === "super-admin" && (
                    <div className="">
                        <Label className="block text-medium font-medium text-gray-700 mb-2 pt-1">
                            Clinic
                            <span className="text-red-500">*</span>
                        </Label>
                        <select
                            id="clinic"
                            name="clinic"
                            value={formData.clinicId}
                            onChange={handleClinicChange}
                            className="px-3 py-2 h-[42px] border w-full border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            disabled={isAddingPatient || isUpdatingPatient}
                            required
                        >
                            <option value="">Select Clinic</option>
                            {clinicData?.data?.data?.map((clinic: any) => (
                                <option key={clinic.id} value={clinic.id}>
                                    {clinic.name}
                                </option>
                            ))}
                        </select>
                        {errors?.clinicId && (
                            <span className="text-red-500 text-xs">
                                {errors.clinicId}
                            </span>
                        )}
                    </div>
                )}

                {/* <CampaignSelector
                    selectedCampaign={
                        (data?.data?.campaign || formData?.campaign[0]?.id) ??
                        ""
                    }
                    selectedStartDate={formData?.campaign[0]?.startDate ?? ""}
                    onCampaignSelect={handleCampaignSelect}
                    disabled={isAddingPatient || isUpdatingPatient}
                    showStartDate={false}
                /> */}
                {/* <AppInputField
                    id="startDate"
                    name="startDate"
                    className="text-sm"
                    label="Campaign Start Date"
                    type="date"
                    value={formData?.campaign[0]?.startDate ?? ""}
                    onChange={handleCampaignDateSelect}
                    error={errors?.startDate}
                    disabled={isAddingPatient || isUpdatingPatient}
                    variant="dashboard"
                /> */}

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
