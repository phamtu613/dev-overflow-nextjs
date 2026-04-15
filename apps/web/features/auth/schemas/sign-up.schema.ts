import { z } from "zod";

export const signUpSchema = z.object({
    firstName: z
        .string()
        .trim()
        .max(100, "First name must be less than 100 characters")
        .optional(),
    lastName: z
        .string()
        .trim()
        .max(100, "Last name must be less than 100 characters")
        .optional(),
    username: z
        .string()
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be less than 50 characters")
        .regex(
            /^[a-zA-Z0-9._-]+$/,
            "Username can only contain letters, numbers, dots, underscores, and hyphens"
        ),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
