import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ZodError } from "zod";
import { PatientFormData, getPatientSchema } from "./patient.schema";

export const usePatientActionForm = (
    role: "super-admin" | "clinic" | "admin",
    data?: PatientFormData | null
) => {
    const [formData, setFormData] = useState<Partial<Record<string,any>>>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        areaOfConcernIds: [],
        dob: "",
        gender: null,
        description: "",
        clinicId : ''
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

    const handleAreaOfConcernsChange = (
        selected: { label: string; value: string }[]
    ) => {
        console.log(selected);
        setFormData((prev) => ({
            ...prev,
            areaOfConcernIds: selected.map((item) => item.value),
        }));
    };

    const handlePhoneChange = (value: string | undefined) => {
        setFormData((prev) => ({
            ...prev,
            phone: value || "",
        }));
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as unknown as "male" | "female" | "other";
        setFormData((prev) => ({
            ...prev,
            gender: value,
        }));
    };

    const handleClinicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as unknown as string;
        setFormData((prev) => ({
            ...prev,
            clinicId: value,
        }));
    };

    console.log(formData)


    const validateForm = () => {
        try {
            const validated = getPatientSchema(role).parse(formData);
            console.log(validated);
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
            console.log(err);
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
        handlePhoneChange,
        handleGenderChange,
        handleAreaOfConcernsChange,
        handleClinicChange,
    };
};
