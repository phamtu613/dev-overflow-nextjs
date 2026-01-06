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

        // 1. Create sign-in attempt
        await signIn.create({ identifier: email });

        // 2. Find email_link factor
        const emailLinkFactor = signIn.supportedFirstFactors?.find(
            (f) => f.strategy === "email_link",
        );

        if (!emailLinkFactor || !("emailAddressId" in emailLinkFactor)) {
            throw new Error("Email link not supported");
        }

        // 3. Send magic link
        await signIn.prepareFirstFactor({
            strategy: "email_link",
            emailAddressId: emailLinkFactor.emailAddressId,
            redirectUrl: `${window.location.origin}/sso-callback`,
        });
    };





    return {
        isLoaded,
        signInWithOAuth,
        sendMagicLink,
    };
}
