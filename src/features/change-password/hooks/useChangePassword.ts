"use client";
import { useState } from "react";
import { z } from "zod";
import {
    changePasswordBase,
    ChangePasswordFormData,
    changePasswordSchema,
} from "../schema/changePassword.schema";
import { BACKEND_HOST } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { createApiRequest } from "@/helpers/fetch.helper";

interface FormErrors {
    newPassword?: string;
    confirmPassword?: string;
    oldPassword?: string;
}

export const useChangePassword = (token: string) => {
    const router = useRouter();
    const { showToast } = useToast();
    const fetcher = createApiRequest();

    const [formData, setFormData] = useState<ChangePasswordFormData>({
        oldPassword: "",
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
            changePasswordBase
                .pick({ newPassword: true, confirmPassword: true })
                .parse({
                    newPassword: formData.newPassword,
                    confirmPassword: value,
                });

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

        console.log(formData);

        try {
            changePasswordSchema.parse(formData);
            setErrors({});

            const response = await fetcher.makeRequest({
                url: `${BACKEND_HOST}/v1/password/change`,
                method: "POST",
                body: {
                    newPassword: formData.newPassword,
                    confirmPassword: formData.confirmPassword,
                },
            });

            const data = await response.json();
            showToast({
                variant: "success",
                description: data?.message,
            });
            router.replace(appRoutes.LOGIN_INDEX_PAGE);
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
                showToast({
                    variant: "destructive",
                    description: error?.message,
                });
                console.log(error);
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
