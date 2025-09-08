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

interface FormErrors {
    newPassword?: string;
    confirmPassword?: string;
}

export const useChangePassword = (token: string , isAdmin : boolean) => {
    const { showToast } = useToast();
    const router = useRouter();
    const [formData, setFormData] = useState<ChangePasswordFormData>({
        newPassword: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (
        name: keyof ChangePasswordFormData,
        value: string,
        nextFormData: ChangePasswordFormData
    ) => {
        try {
            setErrors((prev) => ({ ...prev, [name]: undefined }));

            changePasswordBase
                .pick({ newPassword: true, confirmPassword: true })
                .parse({
                    newPassword: nextFormData.newPassword,
                    confirmPassword: nextFormData.confirmPassword,
                });
        } catch (error) {
            if (error instanceof z.ZodError) {
                const firstError = error.errors[0];
                if (firstError?.path[0]) {
                    setErrors((prev) => ({
                        ...prev,
                        [firstError.path[0] as keyof FormErrors]:
                            firstError.message,
                    }));
                }
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        validateField(name as keyof ChangePasswordFormData, value, {
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        console.log(formData);

        try {
            changePasswordSchema.parse(formData);
            setErrors({});

            const res = await fetch(
                `${BACKEND_HOST}/v1/password/set/${token}${isAdmin ? '?isAdmin=true' : ''}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        newPassword: formData.newPassword,
                        confirmPassword: formData.confirmPassword,
                    }),
                }
            );
            const data = await res.json();
            if(!res.ok) throw new Error(data?.message || 'Something went wrong');
            
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
