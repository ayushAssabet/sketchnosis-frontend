import { ChangeEvent, useContext, useEffect, useState } from "react";
import { ZodError } from "zod";
import {
    IllustrationFormData,
    illustrationSchema,
} from "./illustration.schema";
import { CategoryContext } from "@/contexts/CategoryContextProvider";

export const useIllusrationActionForm = (data?: any | null) => {
    const { categories } = useContext(CategoryContext)
    const [formData, setFormData] = useState<Partial<IllustrationFormData>>({
        title: "",
        areaOfConcernIds: [],
        description: "",
    });

    const [errors, setErrors] = useState<Record<string, any>>({});

    useEffect(() => {
        if (data)
            setFormData({
                title: data?.title,
                description: data?.description,
                areaOfConcernIds: data?.areaOfConcerns?.map(
                    (category) => category?.id
                ),
            });
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

    console.log(categories)

    const validateForm = () => {
        try {
            const areaOfConcernNames: string[] =
                categories
                    ?.filter((aoc: any) =>
                        formData.areaOfConcernIds?.includes(aoc.id)
                    )
                    .map((aoc: any) => aoc.name) || [];
            const validated = illustrationSchema.parse({...formData , areaOfConcernNames });
            setErrors({});
            return { success: true, data: validated };
        } catch (err) {
            if (err instanceof ZodError) {
                const formatted: Record<string, string> = {};
                err.errors.forEach((e) => {
                    if (e.path[0]) formatted[e.path[0] as string] = e.message;
                });
                setErrors(formatted);
                console.log(errors);
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
