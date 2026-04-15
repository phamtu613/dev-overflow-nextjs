"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import type { OAuthProvider } from "@/features/auth/constants/oauth";

interface SignUpSocialProps {
    onOAuth: (provider: OAuthProvider) => Promise<void>;
}

const SOCIAL_PROVIDERS = [
    { name: "github" as const, icon: "/social/github-mark.svg", label: "Continue with GitHub" },
    { name: "google" as const, icon: "/social/google.svg", label: "Continue with Google" },
] as const;

export function SignUpSocial({ onOAuth }: SignUpSocialProps) {
    const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(null);

    const handleOAuthClick = useCallback(
        async (provider: OAuthProvider) => {
            setLoadingProvider(provider);
            try {
                await onOAuth(provider);
            } catch (error) {
                // Error will be handled by parent component
                console.error(`OAuth error for ${provider}:`, error);
            } finally {
                setLoadingProvider(null);
            }
        },
        [onOAuth]
    );

    return (
        <div className="space-y-3" role="group" aria-label="Social sign up options">
            {SOCIAL_PROVIDERS.map(({ name, icon, label }) => (
                <button
                    key={name}
                    type="button"
                    onClick={() => handleOAuthClick(name)}
                    disabled={loadingProvider !== null}
                    aria-label={label}
                    className="
                        w-full h-11
                        bg-white
                        border border-gray-200
                        rounded-lg
                        flex items-center gap-3
                        px-4
                        text-sm font-medium text-gray-900
                        hover:bg-gray-50
                        transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white
                    "
                >
                    {loadingProvider === name ? (
                        <div className="h-4 w-4 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
                    ) : (
                        <Image
                            src={icon}
                            width={18}
                            height={18}
                            alt={`${name} icon`}
                            className="object-contain"
                        />
                    )}
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
}
