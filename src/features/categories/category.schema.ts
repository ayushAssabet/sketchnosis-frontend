import { nonEmptyAlphanumericRegex } from "@/utils/constants";
import z from "zod";

export const categorySchema = z.object({
    name: z
        .string()
        .min(1, "Area of concern is required")
        .max(255)
        .refine(
            (val) => nonEmptyAlphanumericRegex.test(val.trim()),
            "Name cannot contain only spaces or special characters"
        ),
    description: z
        .string()
        .max(255)
        .optional()
        .refine(
            (val) =>
                !val ||
                val.trim() === "" ||
                nonEmptyAlphanumericRegex.test(val),
            "Description cannot contain only spaces or special characters"
        ),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
