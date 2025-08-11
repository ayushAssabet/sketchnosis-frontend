"use client";
import React from "react";
import AuthIntro from "@/components/elements/AuthIntro";
import AppInputField from "@/components/forms/InputField";
import AppButton from "@/components/elements/AppButton";
import { useChangePassword } from "@/features/change-password/hooks/useChangePassword";

const ChagePasswordForm: React.FC<{ token: string; title: string | null }> = ({
    token,
    title,
}) => {
    const {
        handleSubmit,
        formData,
        handleChange,
        errors,
        isSubmitting,
        disableSubmit,
    } = useChangePassword(token);

    return (
        <form onSubmit={handleSubmit} className="min-w-[536px] space-y-14">
            <AuthIntro
                title={title ?? "Change Password"}
                supportText="Please enter passwords"
            />

            <div className="form_group mt-16">
                <div className="space-y-5 mb-8">
                    <AppInputField
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        type="password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter your new password"
                        error={errors.newPassword}
                        disabled={isSubmitting}
                        showPasswordToggle={true}
                    />
                    <AppInputField
                        id="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        error={errors.confirmPassword}
                        disabled={isSubmitting}
                        showPasswordToggle={true}
                    />
                </div>

                <AppButton
                    type="submit"
                    disabled={disableSubmit}
                    isLoading={isSubmitting}
                    loadingText={
                        title ? "Setting Password..." : "Changing Password ..."
                    }
                    className="w-full py-6"
                >
                    {title ? "Change Password" : "Set Password"}
                </AppButton>
            </div>
        </form>
    );
};

export default ChagePasswordForm;
