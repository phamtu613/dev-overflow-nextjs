"use client";

import { useSignIn } from "@clerk/nextjs";
import type { OAuthProvider } from "../constants/oauth";
import { OAUTH_PROVIDERS } from "../constants/oauth";

export function useSignInActions() {
    const { signIn, isLoaded } = useSignIn();

    const signInWithOAuth = async (provider: OAuthProvider) => {
        if (!isLoaded) return;

        await signIn.authenticateWithRedirect({
            strategy: OAUTH_PROVIDERS[provider].strategy,
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/dashboard",
        });
    };

    const sendMagicLink = async (email: string) => {
        if (!isLoaded) return;

        await signIn.create({
            identifier: email,
            strategy: "email_link",
            redirectUrl: "/sso-callback",
        });
    };

    return {
        isLoaded,
        signInWithOAuth,
        sendMagicLink,
    };
}
