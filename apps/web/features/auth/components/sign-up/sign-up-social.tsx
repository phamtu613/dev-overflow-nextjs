"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import type { OAuthProvider } from "@/features/auth/constants/oauth";

interface SignUpSocialProps {
    onOAuth: (provider: OAuthProvider) => Promise<void>;
}

const SOCIAL_PROVIDERS = [
    { name: "google" as const, icon: "/social/google.svg", label: "Sign up with Google" },
    { name: "facebook" as const, icon: "/social/facebook.svg", label: "Sign up with Facebook" },
    { name: "twitter" as const, icon: "/social/twitter.svg", label: "Sign up with Twitter" },
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
        <div className="flex justify-center gap-4" role="group" aria-label="Social sign up options">
            {SOCIAL_PROVIDERS.map(({ name, icon, label }) => (
                <button
                    key={name}
                    onClick={() => handleOAuthClick(name)}
                    disabled={loadingProvider !== null}
                    aria-label={label}
                    className="
                        w-12 h-12 
                        bg-[#11131a] 
                        border border-white/10 
                        rounded-xl 
                        flex items-center justify-center 
                        hover:bg-[#181b22] 
                        transition-colors
                        disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#1a1d29]
                    "
                >
                    {loadingProvider === name ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
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
