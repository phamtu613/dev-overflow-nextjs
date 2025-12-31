"use client";

import type { OAuthProvider } from "@/features/auth/constants/oauth";
import { OAUTH_PROVIDERS } from "@/features/auth/constants/oauth";

interface Props {
    onOAuth(provider: OAuthProvider): void;
}

export function SignInSocial({ onOAuth }: Props) {
    return (
        <div className="flex justify-center gap-4 mt-4">
            {Object.entries(OAUTH_PROVIDERS).map(([provider, cfg]) => (
                <button
                    key={provider}
                    type="button"
                    onClick={() => onOAuth(provider as OAuthProvider)}
                    className="w-12 h-12 bg-[#11131a] border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#181b22]"
                    aria-label={`Sign in with ${cfg.label}`}
                >
                    <img
                        src={cfg.icon}
                        alt={cfg.label}
                        className="h-5 w-5"
                    />
                </button>
            ))}
        </div>
    );
}
