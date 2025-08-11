import z from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    password: z
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
});

export type LoginFormData = z.infer<typeof loginSchema>;
