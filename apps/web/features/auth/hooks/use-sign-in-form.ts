"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useClerk, useSignIn } from "@clerk/nextjs";
import { useCallback, useState } from "react";

import type { SignInInput } from "../schemas/sign-in.schema";
import { signInSchema } from "../schemas/sign-in.schema";
import { signInWithEmail } from "../services/auth.service";
import { useRouter } from "next/navigation";

export function useSignInForm() {
    const { signIn, isLoaded } = useSignIn();
    const [error, setError] = useState<string | null>(null);
    const { setActive } = useClerk();
    const router = useRouter();

    const form = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
    });

    const onSubmit = useCallback(
        async (values: SignInInput) => {
            if (!isLoaded) return;

            try {
                setError(null);

                const result = await signInWithEmail(signIn, values);

                if (result.status === "complete" && result.createdSessionId) {
                    await setActive({
                        session: result.createdSessionId,
                    });
                    // session đã active
                    // redirect để middleware / layout xử lý
                }
            } catch (err: any) {
                setError(err?.errors?.[0]?.message ?? "Sign in failed");
            }
        },
        [isLoaded, signIn]
    );


    return {
        form,
        onSubmit,
        error,
        isSubmitting: form.formState.isSubmitting,
    };
}
