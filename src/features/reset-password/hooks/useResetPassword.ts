"use client";
import { useState } from "react";
import { z } from "zod";
import {
    resetPasswordFormData,
    resetPasswordSchema,
} from "../schema/resetPassword.schema";
import { BACKEND_HOST } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast";

interface FormErrors {
    email?: string;
}

export const useResetPassword = () => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState<resetPasswordFormData>({
        email: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (
        name: keyof resetPasswordFormData,
        value: string
    ) => {
        try {
            resetPasswordSchema.shape[name].parse(value);
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

        validateField(name as keyof resetPasswordFormData, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            resetPasswordSchema.parse(formData);
            setErrors({});
            const res = await fetch(`${BACKEND_HOST}/v1/password/forget`, {
                method: "POST",
                body: JSON.stringify({
                    email: formData.email,
                }),
            });
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
        disableSubmit: errors?.email || isSubmitting ? true : false,
    };
};
