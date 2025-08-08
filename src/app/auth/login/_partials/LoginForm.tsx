"use client";
import React from "react";
import AuthIntro from "@/components/elements/AuthIntro";
import { useLogin } from "@/features/login/hooks/useLogin";
import AppInputField from "@/components/forms/InputField";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import AppButton from "@/components/elements/AppButton";

const LoginForm: React.FC = () => {
    const {
        handleSubmit,
        formData,
        handleChange,
        errors,
        isSubmitting,
        disableSubmit,
    } = useLogin();
    return (
        <form onSubmit={handleSubmit} className="min-w-[536px] space-y-14">
            <AuthIntro
                title="Login"
                supportText="Please enter your credentials to access your account."
            />

            <div className="form_group mt-16">
                <div className="space-y-5 mb-8">
                    <AppInputField
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData?.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        error={errors?.email}
                        disabled={isSubmitting}
                    />
                    <AppInputField
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formData?.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        error={errors?.password}
                        disabled={isSubmitting}
                        showPasswordToggle={true}
                    />
                    <div className="flex items-center text-sm justify-between">
                        <div className="flex items-center gap-1">
                            <Checkbox className="border-" />
                            Remember Me
                        </div>
                        <Link
                            href={"#"}
                            className="text-primary hover:underline"
                        >
                            Forgot Password ?
                        </Link>
                    </div>
                </div>

                <AppButton
                    type="submit"
                    disabled={disableSubmit}
                    isLoading={isSubmitting}
                    loadingText="Signing In..."
                    className="w-full py-6 text-base cursor-pointer"
                >
                    Login
                </AppButton>
            </div>
        </form>
    );
};

export default LoginForm;
