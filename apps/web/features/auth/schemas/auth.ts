
import { z } from "zod";

export const SignInSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const SignUpSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignInValues = z.infer<typeof SignInSchema>;
export type SignUpValues = z.infer<typeof SignUpSchema>;
