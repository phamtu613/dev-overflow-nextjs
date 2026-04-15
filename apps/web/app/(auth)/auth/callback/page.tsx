"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function AuthCallbackPage() {
    return (
        <AuthenticateWithRedirectCallback
            signInForceRedirectUrl="/complete-profile"
            signUpForceRedirectUrl="/complete-profile"
        />
    );
}