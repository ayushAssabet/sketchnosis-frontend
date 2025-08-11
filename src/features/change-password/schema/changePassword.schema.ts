import z from "zod";

// Zod validation schema
export const changePasswordSchema = z.object({
    newPassword: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 6 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(
            /[!@#$%^&*()\-_+=\[\]{};:'",<.>\/?\\|`~]/,
            "Password must contain at least one special character"
        ),
    confirmPassword: z
        .string()
        .min(1, "Confirm Password is required")
        .min(8, "Password must be at least 8 characters long")
        .refine((val) => val === (z as any).getContext().parent.newPassword, {
            message: "Passwords must match",
            path: ["confirmPassword"],
        }),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
