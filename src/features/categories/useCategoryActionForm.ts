import { ChangeEvent, useEffect, useState } from "react";
import { CategoryFormData, categorySchema } from "./category.schema";
import { ZodError } from "zod";

export const useCategoryActionForm = (data? : CategoryFormData | null) => {

    const [formData, setFormData] = useState<Partial<CategoryFormData>>({
        name: "",
        description : "" ,
    });

    const [errors , setErrors] = useState<Record<string , any>>({});

    useEffect(() => {
        if(data) setFormData(data)
    },[data])


    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value , id } = e.currentTarget
        setFormData((prev) =>({...prev , [id] : value}) )
    }

    const validateForm = () => {
        try {
        const validated = categorySchema.parse(formData);
        setErrors({});
        return { success: true, data: validated };
        } catch (err) {
        if (err instanceof ZodError) {
            const formatted: Record<string, string> = {};
            err.errors.forEach(e => {
            if (e.path[0]) formatted[e.path[0] as string] = e.message;
            });
            setErrors(formatted);
        }
        return { success: false };
        }
    };


    return{
        formData , 
        setFormData , 
        handleChange,
        errors , 
        setErrors,
        validateForm
    }
}