"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/nextjs";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import type { SignUpInput } from "../schemas/sign-up.schema";
import { signUpSchema } from "../schemas/sign-up.schema";
import { signUpWithEmail } from "../services/auth.service";

export function useSignUpForm() {
    const { signUp, isLoaded } = useSignUp();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<SignUpInput>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = useCallback(
        async (values: SignUpInput) => {
            if (!isLoaded || !signUp) {
                setError("Sign up is not ready. Please try again.");
                return;
            }

            try {
                setError(null);

                await signUpWithEmail(signUp, values);

                // Redirect to check-email page
                router.push("/verify-email");
            } catch (err: unknown) {
                const fallbackMessage = "Sign up failed";
                if (typeof err === "object" && err !== null && "errors" in err) {
                    const clerkErrors = (err as { errors?: Array<{ message?: string }> }).errors;
                    setError(clerkErrors?.[0]?.message ?? fallbackMessage);
                    return;
                }

                setError(fallbackMessage);
            }
        },
        [isLoaded, signUp, router]
    );

    return {
        form,
        onSubmit,
        error,
        isSubmitting: form.formState.isSubmitting,
    };
}
