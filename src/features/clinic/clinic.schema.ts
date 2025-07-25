import z from "zod";

export const clinicSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required"),
    areaOfConcernIds: z
        .array(z.string().min(1, "Each category is required"))
        .min(1, "At least one area of concern is required"),
    description: z
        .string()
        .optional(),
    email: z
        .string()
        .min(1, "Email is required")
        .email('Please enter valid email'),
    address: z
        .string()
        .optional(),
    contactPersonName: z
        .string()
        .min(1, "Contact Person is required")
        .optional(),
    phone: z
        .string()
        .regex(/^\d+$/, "Phone number must contain only digits")
        .min(10, "Phone number must be at least 10 digits")
        .optional(),
    logo: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "Logo file size must be less than 5MB",
        })
        .refine(
            (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
            {
                message: "Logo must be a JPEG or PNG image",
            }
        )
        .optional(),
});

export type ClinicFormData = z.infer<typeof clinicSchema>;