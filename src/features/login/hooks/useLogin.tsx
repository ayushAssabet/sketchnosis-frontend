"use client";
import { useState } from "react";
import { z } from "zod";
import {
    LoginFormData,
    loginSchema,
} from "@/features/login/schema/login.schema";
import { createApiRequest } from "@/helpers/fetch.helper";
import { BACKEND_HOST } from "@/utils/constants";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/features/login/context/AuthContextProvider";
import { setTokens } from "@/helpers/cookie.helper";
import { useRouter } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { useLocalStorage } from "@/hooks/use-localStorage";

interface FormErrors {
    email?: string;
    password?: string;
}

export const useLogin = () => {
    const routes = useRouter();

    const fetcher = createApiRequest();
    const { showToast } = useToast();
    const { fetchUser } = useAuth();
    const [isRemember, setIsRemember] = useLocalStorage<boolean>(
        "isRemember",
        false
    );
    const [rememberedEmail, setRememberedEmail] = useLocalStorage<string>(
        "rememberedEmail",
        ""
    );
    const [formData, setFormData] = useState<LoginFormData>({
        email: rememberedEmail,
        password: "",
    });

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
            setTokens(res?.data?.accessToken, res?.data?.refreshToken);
            await fetchUser();

            showToast({
                variant: "success",
                description: res?.message,
            });
            if (isRemember) {
                setRememberedEmail(validatedData.email);
            } else {
                setRememberedEmail("");
            }

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
        isRemember,
        setIsRemember,
        isSubmitting,
        handleChange,
        handleSubmit,
        disableSubmit:
            errors?.email || errors?.password || isSubmitting ? true : false,
    };
};
