"use client";

import { useClerk, useSignIn, useSignUp } from "@clerk/nextjs";
import type { OAuthProvider } from "../constants/oauth";
import { OAUTH_PROVIDERS } from "../constants/oauth";

export function useSignInActions() {
    const { signIn, isLoaded } = useSignIn();
    const {  isLoaded: isSignUpLoaded } = useSignUp();

    const signInWithOAuth = async (provider: OAuthProvider) => {
        if (!isLoaded || !signIn) {
            throw new Error("Sign in not ready");
        }

        await signIn.authenticateWithRedirect({
            strategy: OAUTH_PROVIDERS[provider].strategy,
            redirectUrl: `${window.location.origin}/auth/callback`,
            redirectUrlComplete: `${window.location.origin}/complete-profile`,
        });
    };

    const sendMagicLink = async (email: string) => {
        if (!isLoaded || !signIn) {
            throw new Error("Sign in is not ready");
        }

        const signInResponse = await signIn.create({ identifier: email });

        const emailLinkFactor = signInResponse.supportedFirstFactors?.find(
            (f) => f.strategy === "email_link",
        );

        if (!emailLinkFactor || !("emailAddressId" in emailLinkFactor)) {
            throw new Error("Email link not supported");
        }

        await signIn.prepareFirstFactor({
            strategy: "email_link",
            emailAddressId: emailLinkFactor.emailAddressId,
            redirectUrl: `${window.location.origin}/auth/callback`,
        });

        window.location.href = "/check-email";
    };

    return {
        isLoaded: isLoaded && isSignUpLoaded,
        signInWithOAuth,
        sendMagicLink,
    };
}
