import z from "zod";

// Zod validation schema
export const changePasswordSchema = z.object({
    newPassword: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters long")
        .refine(
            (password: any) => {
                if (!/[a-z]/.test(password)) return false;
                if (!/[A-Z]/.test(password)) return false;
                if (!/\d/.test(password)) return false;
                if (!/[!@#$%^&*()-_=+{};:'",<.>\/?[\]\\]/.test(password))
                    return false;
                return true;
            },
            { message: "Invalid password format" }
        ),
    confirmPassword: z
        .string()
        .min(1, "Confirm Password is required")
        .min(6, "Password must be at least 6 characters long")
        .refine((val) => val === (z as any).getContext().parent.newPassword, {
            message: "Passwords must match",
            path: ["confirmPassword"],
        }),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
