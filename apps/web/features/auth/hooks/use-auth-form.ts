
"use client";

import { useState, useCallback } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { OAUTH_PROVIDERS, type OAuthProvider } from "@/features/auth/constants/oauth";
import {
    SignInSchema,
    SignUpSchema,
    type SignInValues,
    type SignUpValues,
} from "@/features/auth/schemas/auth";
import { useRouter } from "next/navigation";

type Mode = "signin" | "signup";

export interface UseAuthFormReturn {
    form: UseFormReturn<SignInValues | SignUpValues>;
    onSubmit: (values: SignInValues | SignUpValues) => Promise<void>;
    handleOAuth: (provider: OAuthProvider) => Promise<void>;
    isLoading: boolean;
    error: string | null;
}

export function useAuthForm(mode: Mode): UseAuthFormReturn {
    const isSignIn = mode === "signin";
    const { signIn, isLoaded: signInLoaded } = useSignIn();
    const { signUp, isLoaded: signUpLoaded } = useSignUp();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const form = useForm<SignInValues | SignUpValues>({
        resolver: zodResolver(isSignIn ? SignInSchema : SignUpSchema),
        defaultValues: {
            email: "",
            ...(isSignIn ? {} : { password: "" }),
        },
    });

    const handleOAuth = useCallback(
        async (provider: OAuthProvider) => {
            if (!signInLoaded || !signIn) return;

            try {
                setIsLoading(true);
                await signIn.authenticateWithRedirect({
                    strategy: OAUTH_PROVIDERS[provider].strategy,
                    redirectUrl: `${window.location.origin}/sign-in/sso-callback`,
                    redirectUrlComplete: `${window.location.origin}/`,
                });
            } catch (err) {
                console.error("OAuth error:", err);
                setError(err instanceof Error ? err.message : "OAuth failed");
                setIsLoading(false);
            }
        },
        [signIn, signInLoaded]
    );

    const onSubmit = useCallback(
        async (values: SignInValues | SignUpValues) => {
            setError(null);
            setIsLoading(true);

            try {
                if (isSignIn) {
                    if (!signInLoaded || !signIn) throw new Error("Sign in not ready");

                    const { email } = values as SignInValues;

                    const res = await signIn.create({
                        identifier: email,
                    });

                    const emailFactor = res.supportedFirstFactors?.find(
                        (f) => f.strategy === "email_link"
                    );

                    if (!emailFactor) throw new Error("Email link not supported");

                    await signIn.prepareFirstFactor({
                        strategy: "email_link",
                        emailAddressId: emailFactor.emailAddressId,
                        redirectUrl: `${window.location.origin}/sign-in/sso-callback`,
                    });
                    router.replace("/check-email");
                } else {
                    if (!signUpLoaded || !signUp) throw new Error("Sign up not ready");

                    const { email, password } = values as SignUpValues;

                    await signUp.create({
                        emailAddress: email,
                        password,
                    });

                    await signUp.prepareEmailAddressVerification({
                        strategy: "email_code",
                    });

                    router.replace("/verify-email");
                }
            } catch (err) {
                console.error("Auth error:", err);
                setError(err instanceof Error ? err.message : "Authentication failed");
                setIsLoading(false);
            }
        },
        [isSignIn, signIn, signInLoaded, signUp, signUpLoaded]
    );

    return {
        form,
        onSubmit,
        handleOAuth,
        isLoading,
        error,
    };
}
