// hooks/use-magic-link.ts
"use client";

import { useSignIn } from "@clerk/nextjs";

export function useMagicLink() {
    const { signIn, isLoaded } = useSignIn();

    const sendMagicLink = async (email: string) => {
        if (!isLoaded || !signIn) return;

        await signIn.create({ identifier: email });

        const factor = signIn.supportedFirstFactors?.find(
            (f) => f.strategy === "email_link"
        );

        if (!factor || !("emailAddressId" in factor)) {
            throw new Error("Email link not supported");
        }

        await signIn.prepareFirstFactor({
            strategy: "email_link",
            emailAddressId: factor.emailAddressId,
            redirectUrl: `${window.location.origin}/sign-in/sso-callback`,
        });

    };

    return { sendMagicLink };
}
