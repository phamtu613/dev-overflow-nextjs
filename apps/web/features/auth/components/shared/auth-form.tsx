"use client";

import { useCallback, useMemo, useState } from "react";
import { AuthEmailForm } from "@/components/common/auth-email-form";
import { AuthSocial } from "@/components/common/auth-social";
import type { OAuthProvider } from "@/features/auth/constants/oauth";
import { OAUTH_PROVIDERS } from "@/features/auth/constants/oauth";
import { useSignIn, useSignUp } from "@clerk/nextjs";

type Mode = "signin" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
    const isSignIn = mode === "signin";

    const { signIn, isLoaded: signInLoaded } = useSignIn();
    const { signUp, isLoaded: signUpLoaded } = useSignUp();

    const [password, setPassword] = useState("");

    const providers = useMemo(
        () =>
            Object.entries(OAUTH_PROVIDERS).map(
                ([key, value]) => ({
                    name: key as OAuthProvider,
                    icon: value.icon,
                    label: isSignIn
                        ? `Sign in with ${value.label}`
                        : `Sign up with ${value.label}`,
                })
            ),
        [isSignIn]
    );

    /* ---------------- EMAIL ---------------- */
    const handleEmailSubmit = useCallback(
        async (email: string) => {
            /* ---------- SIGN IN (MAGIC LINK) ---------- */
            if (isSignIn) {
                if (!signInLoaded || !signIn)
                    throw new Error("Sign in not ready");

                const res = await signIn.create({
                    identifier: email,
                });

                const emailFactor = res.supportedFirstFactors?.find(
                    (f) => f.strategy === "email_link"
                );

                if (!emailFactor)
                    throw new Error("Email link not supported");

                await signIn.prepareFirstFactor({
                    strategy: "email_link",
                    emailAddressId: emailFactor.emailAddressId,
                    redirectUrl: `${window.location.origin}/sign-in/sso-callback`,
                });

                window.location.href = "/check-email";
                return;
            }

            /* ---------- SIGN UP (PASSWORD) ---------- */
            if (!signUpLoaded || !signUp)
                throw new Error("Sign up not ready");

            const res = await signUp.create({
                emailAddress: email,
                password,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            window.location.href = "/verify-email";
        },
        [
            isSignIn,
            password,
            signIn,
            signInLoaded,
            signUp,
            signUpLoaded,
        ]
    );

    /* ---------------- OAUTH ---------------- */
    const handleOAuth = useCallback(
        async (provider: OAuthProvider) => {
            if (!signInLoaded || !signIn)
                throw new Error("Sign in not ready");

            await signIn.authenticateWithRedirect({
                strategy: OAUTH_PROVIDERS[provider].strategy,
                redirectUrl: `${window.location.origin}/sign-in/sso-callback`,
                redirectUrlComplete: `${window.location.origin}/`,
            });
        },
        [signIn, signInLoaded]
    );

    return (
        <>
            <AuthSocial
                ariaLabel={isSignIn ? "Social login" : "Social signup"}
                providers={providers}
                onOAuth={handleOAuth}
            />

            {/* EMAIL */}
            <AuthEmailForm
                submitText={isSignIn ? "CONTINUE" : "CREATE ACCOUNT"}
                onSubmit={handleEmailSubmit}
                password={!isSignIn ? password : undefined}
                onPasswordChange={setPassword}
                showPassword={!isSignIn}
            />
        </>
    );
}
