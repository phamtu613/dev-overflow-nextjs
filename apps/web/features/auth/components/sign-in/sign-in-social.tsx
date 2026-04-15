"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import type { OAuthProvider } from "@/features/auth/constants/oauth";

interface SignInSocialProps {
    onOAuth: (provider: OAuthProvider) => Promise<void>;
}

const SOCIAL_PROVIDERS = [
    { name: "google" as const, icon: "/social/google.svg", label: "Sign in with Google" },
    { name: "facebook" as const, icon: "/social/facebook.svg", label: "Sign in with Facebook" },
    { name: "twitter" as const, icon: "/social/twitter.svg", label: "Sign in with Twitter" },
] as const;

export function SignInSocial({ onOAuth }: SignInSocialProps) {
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
        <div className="flex justify-center gap-4" role="group" aria-label="Social login options">
            {SOCIAL_PROVIDERS.map(({ name, icon, label }) => (
                <button
                    key={name}
                    type="button"
                    onClick={() => handleOAuthClick(name)}
                    disabled={loadingProvider !== null}
                    aria-label={label}
                    className="
                        w-12 h-12 
                        bg-white
                        border border-gray-200
                        rounded-xl 
                        flex items-center justify-center 
                        hover:bg-gray-50
                        transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white
                    "
                >
                    {loadingProvider === name ? (
                        <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin" />
                    ) : (
                        <Image
                            src={icon}
                            width={20}
                            height={20}
                            alt={`${name} icon`}
                            className="object-contain"
                        />
                    )}
                </button>
            ))}
        </div>
    );
}
