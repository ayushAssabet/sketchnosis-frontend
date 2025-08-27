import { z } from "zod";

export const changePasswordBase = z.object({
    newPassword: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(
            /[!@#$%^&*()\-_+=\[\]{};:'",<.>\/?\\|`~]/,
            "Password must contain at least one special character"
        ),
    oldPassword: z
        .string()
        .min(1, "Old Password is required")
        .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
        .string()
        .min(1, "Confirm Password is required")
        .min(8, "Password must be at least 8 characters long"),
});

export const changePasswordSchema = changePasswordBase
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    })
    .refine((data) => data.oldPassword != data.confirmPassword, {
        message: "New and Old Password must not match",
        path: ["confirmPassword", "oldPassword"],
    });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
