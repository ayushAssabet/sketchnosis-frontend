import { z } from "zod";

export const profileInfoSchema = z.object({
    firstName: z.string().max(255).min(1, "First name is required"),

    lastName: z.string().max(255).min(1, "Last name is required"),

    email: z
        .string()
        .min(2, "Email is required")
        .refine((val) => val === "" || /\S+@\S+\.\S+/.test(val), {
            message: "Please enter a valid email",
        }),

    phone : z
        .string()
        .min(1, "Phone number is required")
        .refine((val) => /^\d+$/.test(val), {
            message: "Phone number must contain only digits",
            path: [],
        })
        .refine((val) => val.length >= 10, {
            message: "Phone number must be at least 10 digits",
        }),
    address: z.string().max(255).optional(),

});


export const profileImageSchema = z.object({
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
})

export type ProfileInfoFormData = z.infer<typeof profileInfoSchema>;
export type ProfileImageSchema = z.infer<typeof profileImageSchema>;
