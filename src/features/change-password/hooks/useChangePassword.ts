"use client";
import { useState } from "react";
import { z } from "zod";
import {
    ChangePasswordFormData,
    changePasswordSchema,
} from "../schema/changePassword.schema";
import { BACKEND_HOST } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast";

interface FormErrors {
    newPassword?: string;
    confirmPassword?: string;
}

export const useChangePassword = (token: string) => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState<ChangePasswordFormData>({
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (
        name: keyof ChangePasswordFormData,
        value: string
    ) => {
        try {
            changePasswordSchema.shape[name].parse(value);
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        } catch (error) {
            if (error instanceof z.ZodError) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: error.errors[0]?.message,
                }));
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        validateField(name as keyof ChangePasswordFormData, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            changePasswordSchema.parse(formData);
            setErrors({});

            const res = await fetch(
                `${BACKEND_HOST}/v1/password/set/${token}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        newPassword: formData.newPassword,
                        confirmPassword: formData.confirmPassword,
                    }),
                }
            );
            const data = await res.json();
            showToast({
                variant: "success",
                description: data?.message,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: FormErrors = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as keyof FormErrors] =
                            err.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                console.error("Login error:", error);
                alert("Login failed. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        setFormData,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        disableSubmit:
            errors?.newPassword || errors?.confirmPassword || isSubmitting
                ? true
                : false,
    };
};
