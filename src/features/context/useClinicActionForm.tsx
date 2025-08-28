import { ChangeEvent, useEffect, useState } from "react";
import { ClinicFormData, clinicSchema } from "./clinic.schema";
import { ZodError } from "zod";

export const useClinicActionForm = (data? : ClinicFormData | null) => {

    const [formData, setFormData] = useState<Partial<ClinicFormData>>({
        name: "",
        areaOfConcernIds : [] , 
        description : "" , 
        email : "",
        address : "",
        contactPersonName : "",
        phone : ""
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
        const validated = clinicSchema.parse(formData);
        console.log(validated)
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