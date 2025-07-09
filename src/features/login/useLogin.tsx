"use client";
import { useState } from "react";
import { z } from "zod";
import { LoginFormData, loginSchema } from "@/features/login/login.schema";
import { createApiRequest } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContextProvider";
import { setTokens } from "@/helpers/cookie.helper";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";

interface FormErrors {
    email?: string;
    password?: string;
}

export const useLogin = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: "",
        password: "",
    });
    const routes = useRouter();

    const fetcher = createApiRequest();
    const { showToast } = useToast();
    const { fetchUser } = useAuth();

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateField = (name: keyof LoginFormData, value: string) => {
        try {
            loginSchema.shape[name].parse(value);
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

        // Validate on change
        validateField(name as keyof LoginFormData, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate entire form
            const validatedData = loginSchema.parse(formData);
            setErrors({});

            const res = await fetcher.makeRequest({
                url: `${BACKEND_HOST}/v1/auth/login`,
                method: "POST",
                body: validatedData,
            });
            console.log(res);

            setTokens(res?.data?.accessToken, res?.data?.refreshToken);

            await fetchUser();
            routes.push(appRoutes.DASHBOARD_INDEX_PAGE);
        } catch (error: any) {
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
                setErrors(error?.error);
                showToast({
                    variant: "destructive",
                    title: "Failed to login",
                    description: error?.message,
                });
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
            errors?.email || errors?.password || isSubmitting ? true : false,
    };
};
