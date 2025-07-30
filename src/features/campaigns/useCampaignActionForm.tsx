import { ChangeEvent, useEffect, useState } from "react";
import { ZodError } from "zod";
import { CampaignFormData, campaignSchema } from "./campaign.schema";

export const useCampaignActionForm = (data?: CampaignFormData | null) => {
    const [formData, setFormData] = useState<Partial<CampaignFormData>>({
        name: "",
        areaOfConcernIds: [],
        description: "",
        repeat: "daily",
        numberOfWeeks: "2",
        numberOfDays: "5",
        selectedDays: [],
        images: {},
    });

    const [errors, setErrors] = useState<Record<string, any>>({});

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value, id, name } = e.currentTarget;

        // Handle radio buttons using name attribute
        const fieldName = name || id;

        setFormData((prev) => ({
            ...prev,
            [fieldName]: fieldName === "phone" ? value.toString() : value,
        }));

        // Clear error when user starts typing
        if (errors[fieldName]) {
            setErrors((prev) => ({
                ...prev,
                [fieldName]: undefined,
            }));
        }
    };

    const validateForm = () => {
        try {
            const validated = campaignSchema.parse(formData);
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

    const resetForm = () => {
        setFormData({
            name: "",
            areaOfConcernIds: [],
            description: "",
            repeat: "daily",
            numberOfWeeks: "2",
            numberOfDays: "5",
            selectedDays: [],
            images: {},
        });
        setErrors({});
    };

    return {
        formData,
        setFormData,
        handleChange,
        errors,
        setErrors,
        validateForm,
        resetForm,
    };
};
