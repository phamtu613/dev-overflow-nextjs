"use client";

import { useCallback, useMemo, useState } from "react";
import type { OAuthProvider } from "@/features/auth/constants/oauth";
import { OAUTH_PROVIDERS } from "@/features/auth/constants/oauth";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useAuthForm } from "@/features/auth/hooks/use-auth-form";
import { AuthSocial } from "@/components/common/auth-social";
import { AuthEmailForm } from "./index";

type Mode = "signin" | "signup";

export function AuthForm({ mode }: { mode: Mode }) {
    const isSignIn = mode === "signin";
    const { form, onSubmit, handleOAuth, isLoading, error } = useAuthForm(mode);

    const providers = useMemo(
        () =>
            Object.entries(OAUTH_PROVIDERS).map(([key, value]) => ({
                name: key as OAuthProvider,
                icon: value.icon,
                label: isSignIn
                    ? `Sign in with ${value.label}`
                    : `Sign up with ${value.label}`,
            })),
        [isSignIn]
    );

    return (
        <div className="space-y-6">
            <AuthSocial
                ariaLabel={isSignIn ? "Social login" : "Social signup"}
                providers={providers}
                onOAuth={handleOAuth}
            />

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#0b0e14] px-2 text-gray-400">
                        Or continue with
                    </span>
                </div>
            </div>

            <AuthEmailForm
                form={form}
                onSubmit={onSubmit}
                isLoading={isLoading}
                submitText={isSignIn ? "CONTINUE" : "CREATE ACCOUNT"}
                title="Email address"
                showPassword={!isSignIn}
            />

            {error && (
                <p className="text-red-400 text-center text-sm mt-4" role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}
