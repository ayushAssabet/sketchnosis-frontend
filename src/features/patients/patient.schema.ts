import { z } from "zod";

export const patientSchema = z
    .object({
        firstName: z.string().max(255).min(1, "First name is required"),
        lastName: z.string().max(255).min(1, "Last name is required"),

        email: z
            .string()
            .min(2, "Email is required")
            .refine((val) => val === "" || /\S+@\S+\.\S+/.test(val), {
                message: "Please enter a valid email",
            })
            .optional(),

        phone: z
            .string()
            .min(1, "Phone number is required")
            // .refine((val) => /^\d+$/.test(val), {
            //     message: "Phone number must contain only digits",
            // })
            .refine((val) => val.length >= 10, {
                message: "Phone number must be at least 10 digits",
            }),

        address: z.string().max(255).optional(),

        areaOfConcernIds: z
            .array(z.string().min(1, "Each area of concern is required"))
            .min(1, "At least one area of concern must be selected"),

        dob: z.string().min(1, "Date of birth is required"),

        gender: z.enum(["male", "female", "other"], {
            required_error: "Gender is required",
        }),


        description: z.string().max(500).optional(),
    })

export type PatientFormData = z.infer<typeof patientSchema>;
