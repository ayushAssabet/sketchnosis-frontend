"use client";
import AppInputField from "@/components/forms/InputField";
import AppTextArea from "@/components/forms/TextArea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfile } from "@/features/user/hooks/useProfile";
import { useProfileActionForm } from "@/features/user/hooks/useProfileAction";
import { Edit } from "lucide-react";

const ProfileInfo = () => {
    const { formData, handleChange, errors } = useProfileActionForm();
    const { isProfileUpdating } = useProfile();

    return (
        <>
            <Card className="border-gray-400 shadow-none border-none !border-t-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg font-medium text-gray-700">
                        Personal Information
                    </CardTitle>
                    <Button
                        variant="default"
                        size="sm"
                        className="bg-primary hover:bg-blue-600 text-white"
                    >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AppInputField
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            type="number"
                            value={formData?.firstName}
                            onChange={handleChange}
                            placeholder="Enter duration in days"
                            error={errors?.firstName}
                            disabled={isProfileUpdating}
                            variant="dashboard"
                        />
                        <AppInputField
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            type="number"
                            value={formData?.firstName}
                            onChange={handleChange}
                            placeholder="Enter duration in days"
                            error={errors?.lastName}
                            disabled={isProfileUpdating}
                            variant="dashboard"
                        />
                        <AppInputField
                            id="phone"
                            name="phone"
                            label="Phone Number"
                            type="number"
                            value={formData?.phone}
                            onChange={handleChange}
                            placeholder="Enter duration in days"
                            error={errors?.phone}
                            disabled={isProfileUpdating}
                            variant="dashboard"
                        />
                        <AppInputField
                            id="address"
                            name="address"
                            label="Address Number"
                            type="number"
                            value={formData?.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            error={errors?.address}
                            disabled={isProfileUpdating}
                            variant="dashboard"
                        />
                    </div>
                    <div className="space-y-2">
                        <AppTextArea
                            id="description"
                            name="description"
                            className=" text-sm"
                            label="Clinic Description"
                            value={formData?.description ?? ""}
                            onChange={handleChange}
                            placeholder="Eg: Work on orthopedics"
                            error={errors?.description}
                            disabled={isProfileUpdating}
                            variant="dashboard"
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    );
};

export default ProfileInfo;
