"use client";
import React from "react";
import AuthIntro from "@/components/elements/AuthIntro";
import AppInputField from "@/components/forms/InputField";
import AppButton from "@/components/elements/AppButton";
import { useResetPassword } from "@/features/reset-password/hooks/useResetPassword";

const ResetPasswordForm: React.FC = () => {
    const {
        handleSubmit,
        formData,
        handleChange,
        errors,
        isSubmitting,
        disableSubmit,
    } = useResetPassword();

    return (
        <form onSubmit={handleSubmit} className="min-w-[536px] space-y-14">
            <AuthIntro
                title="Reset Password"
                supportText="Please enter email , we will verify and send you email"
            />
            <div className="form_group mt-16">
                <div className="space-y-5 mb-8">
                    <AppInputField
                        id="email"
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        error={errors.email}
                        disabled={isSubmitting}
                        showPasswordToggle={true}
                    />
                </div>

                <AppButton
                    type="submit"
                    disabled={disableSubmit}
                    isLoading={isSubmitting}
                    loadingText="Signing In..."
                    className="w-full py-6"
                >
                    Reset Password
                </AppButton>
            </div>
        </form>
    );
};

export default ResetPasswordForm;
