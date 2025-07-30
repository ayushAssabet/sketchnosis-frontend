import z from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().max(255).optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
