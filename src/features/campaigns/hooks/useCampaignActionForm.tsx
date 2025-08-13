import { ChangeEvent, useEffect, useState } from "react";
import { ZodError } from "zod";
import { CampaignFormData, campaignSchema } from "../schema/campaign.schema";

interface CampaignDetailData extends CampaignFormData {
    scheduleImages: {
        id: string;
        dayNumber: number;
        dayOfWeek: string;
        weekNumber: number;
        imageUrl: string;
    }[];
}

export const useCampaignActionForm = (data?: Record<string, any> | null) => {
    const [formData, setFormData] = useState<Partial<CampaignFormData>>({
        name: "",
        areaOfConcernIds: [],
        description: "",
        repeatType: "daily",
        numberOfWeeks: "2",
        numberOfDays: "5",
        selectedDays: ["Sun", "Mon"],
        images: {},
    });

    const [errors, setErrors] = useState<Record<string, any>>({});

    useEffect(() => {
        if (data) {
            setFormData({
                name: data?.name,
                areaOfConcernIds: data?.areaOfConcerns?.map(
                    (concern, index) => concern?.id
                ),
                description: data?.description,
                repeatType: data?.repeatType,
                numberOfWeeks: data?.numberOfWeeks?.toString(),
                numberOfDays: data?.numberOfDays?.toString(),
                selectedDays: data?.scheduleImages ? data?.scheduleImages?.map(
                    (image, index) => image?.dayOfWeek
                ) : ["Sun", "Mon"],
                images: data?.scheduleImages?.map((image, index) => image?.id),
            });
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

    const validateForm = (data) => {
        try {
            const validated = campaignSchema.parse(data);
            console.log(validated);
            setErrors({});
            return { success: true, data: validated };
        } catch (err) {
            console.log(err);
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
            repeatType: "daily",
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
