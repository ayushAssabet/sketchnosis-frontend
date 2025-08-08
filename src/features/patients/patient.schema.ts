import { z } from "zod";

export const patientSchema = z.object({
    firstName: z.string().max(255).min(1, "First name is required"),

    lastName: z.string().max(255).min(1, "Last name is required"),

    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email"),

    phone: z
        .string()
        .regex(/^\d+$/, "Phone number must contain only digits")
        .min(10, "Phone number must be at least 10 digits"),

    address: z.string().max(255).optional(),

    areaOfConcernIds: z
        .array(z.string().min(1, "Each area of concern is required"))
        .min(1, "At least one area of concern must be selected"),

    dob: z.string().min(1, "Date of birth is required"),

    gender: z.enum(["male", "female", "other"], {
        required_error: "Gender is required",
    }),

    campaignId: z.string().min(1, "Campaign is required"),

    campaignStartDate: z
        .string()
        .min(1, "Campaign start date is required")
        .optional(),

    description: z.string().max(500).optional(),

    profile: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "profile file size must be less than 5MB",
        })
        .refine(
            (file) =>
                ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
            {
                message: "profile must be a JPEG or PNG image",
            }
        )
        .optional(),
});

export type PatientFormData = z.infer<typeof patientSchema>;
