import z from "zod";

export const categorySchema = z.object({
    name: z.string().max(255).min(1, "Area of concern is required"),
    description: z.string().max(255).optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
