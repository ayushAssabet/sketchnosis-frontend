import z from "zod";

export const illustrationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    areaOfConcernIds: z
        .array(
            z.string().min(1, "At least one area of concern must be selected ")
        )
        .min(1, "At least one area of concern is required"),
    description: z.string().optional(),
    illustration: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "Logo file size must be less than 5MB",
        })
        .refine(
            (file) =>
                ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
            {
                message: "Logo must be a JPEG or PNG image",
            }
        )
        .optional(),
});

export type IllustrationFormData = z.infer<typeof illustrationSchema>;
