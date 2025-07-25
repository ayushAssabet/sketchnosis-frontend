import { ChangeEvent, useEffect, useState } from "react";
import { ZodError } from "zod";
import { IllustrationFormData, illustrationSchema } from "./illustration.schema";

export const useIllusrationActionForm = (data? : IllustrationFormData | null) => {

    const [formData, setFormData] = useState<Partial<IllustrationFormData>>({
        title: "",
        areaOfConcernIds : [] , 
        description : "" , 
        
    });

    const [errors , setErrors] = useState<Record<string , any>>({});

    useEffect(() => {
        if(data) setFormData(data)
    },[data])


    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value , id } = e.currentTarget
        setFormData((prev) =>({...prev , [id] : id == 'phone' ? value.toString() : value}) )
    }

    const validateForm = () => {
        try {
        const validated = illustrationSchema.parse(formData);
        setErrors({});
        return { success: true, data: validated };
        } catch (err) {
        if (err instanceof ZodError) {
            const formatted: Record<string, string> = {};
            err.errors.forEach(e => {
            if (e.path[0]) formatted[e.path[0] as string] = e.message;
            });
            setErrors(formatted);
            console.log(errors)
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