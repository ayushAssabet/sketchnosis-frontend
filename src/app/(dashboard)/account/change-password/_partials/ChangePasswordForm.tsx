"use client";
import React from "react";
import AuthIntro from "@/components/elements/AuthIntro";
import { useLogin } from "@/features/login/hooks/useLogin";
import AppInputField from "@/components/forms/InputField";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import AppButton from "@/components/elements/AppButton";
import { useChangePassword } from "@/features/change-password/hooks/useChangePassword";
import { getAccessToken } from "@/helpers/cookie.helper";

const ChangePasswordForm: React.FC = () => {
    const {
        handleSubmit,
        formData,
        handleChange,
        errors,
        isSubmitting,
        disableSubmit,
    } = useChangePassword(getAccessToken()?.accessToken);

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-14 max-w-[536px] mx-auto"
        >
            <AuthIntro
                supportClassName="text-sm"
                titleClassName="text-xl"
                title="Change Password"
                supportText="Your new password must contain at least 8 characters, must include one upper case letter, one number and one special character."
            />

            <div className="form_group mt-16">
                <div className="space-y-5 mb-8">
                    <AppInputField
                        id="oldPassword"
                        name="oldPassword"
                        label="Old Password"
                        type="password"
                        value={formData?.oldPassword}
                        onChange={handleChange}
                        placeholder="Enter your Old password"
                        error={errors?.oldPassword}
                        disabled={isSubmitting}
                    />
                    <AppInputField
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        type="password"
                        value={formData?.newPassword}
                        onChange={handleChange}
                        placeholder="Enter your New password"
                        error={errors?.newPassword}
                        disabled={isSubmitting}
                        showPasswordToggle={true}
                    />
                    <AppInputField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formData?.newPassword}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        error={errors?.newPassword}
                        disabled={isSubmitting}
                        showPasswordToggle={true}
                    />
                </div>

                <AppButton
                    type="submit"
                    disabled={disableSubmit}
                    isLoading={isSubmitting}
                    loadingText="Changing Password"
                    className="w-full py-6 text-base cursor-pointer"
                >
                    Change Password
                </AppButton>
            </div>
        </form>
    );
};

export default ChangePasswordForm;
