"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { ZodError } from "zod";
import {
    ProfileInfoFormData,
    profileInfoSchema,
} from "../schema/profile.schema";
import { ProfileFormData } from "../interface/profile.interface";

export const useProfileActionForm = (data?: ProfileInfoFormData | null) => {
    const [formData, setFormData] = useState<Partial<ProfileFormData>>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        description: "",
    });

    const [errors, setErrors] = useState<Record<string, any>>({});

    useEffect(() => {
        if (data) setFormData(data);
    }, [data]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, id } = e.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [id]: id == "phone" ? value.toString() : value,
        }));
    };

    const validateForm = () => {
        try {
            const validated = profileInfoSchema.parse(formData);
            setErrors({});
            return { success: true, data: validated };
        } catch (err) {
            if (err instanceof ZodError) {
                const formatted: Record<string, string> = {};
                err.errors.forEach((e) => {
                    if (e.path[0]) formatted[e.path[0] as string] = e.message;
                });
                setErrors(formatted);
            }
            return { success: false };
        }
    };

    return {
        formData,
        setFormData,
        handleChange,
        errors,
        setErrors,
        validateForm,
    };
};
