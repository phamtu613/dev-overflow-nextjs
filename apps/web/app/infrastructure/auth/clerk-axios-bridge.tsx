"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { registerAuthTokenGetter } from "@/lib/api";
import { getJwtSegmentCount, logClerkToken } from "@/lib/api/jwt-debug";

const clerkJwtTemplate = process.env.NEXT_PUBLIC_CLERK_JWT_TEMPLATE || "backend-test";

export function ClerkAxiosBridge() {
    const { isSignedIn, isLoaded, getToken } = useAuth();
    /**
     * Debug direct token on mount
     */
    useEffect(() => {
        (async () => {
            const token = await getToken({
                template: clerkJwtTemplate,
            });

            console.log("DIRECT TOKEN", token);
        })();
    }, []);

    /**
     * Register token getter for Axios / API layer
     */
    useEffect(() => {
        console.log("[ClerkAxiosBridge] registerAuthTokenGetter", {
            isLoaded,
            isSignedIn,
            template: clerkJwtTemplate,
        });

        registerAuthTokenGetter(async () => {
            if (!isLoaded || !isSignedIn) {
                console.log("[ClerkAxiosBridge] getToken:skipped", {
                    isLoaded,
                    isSignedIn,
                    template: clerkJwtTemplate,
                });

                logClerkToken("getToken:skipped", null, {
                    isLoaded,
                    isSignedIn,
                    template: clerkJwtTemplate,
                });

                return null;
            }

            const token = await getToken({
                template: clerkJwtTemplate,
            });

            console.log("[ClerkAxiosBridge] getToken:resolved", {
                hasToken: Boolean(token),
                parts: getJwtSegmentCount(token),
                template: clerkJwtTemplate,
            });

            console.log("token", token);
            console.log("parts", getJwtSegmentCount(token));

            logClerkToken("getToken:resolved", token, {
                isLoaded,
                isSignedIn,
                template: clerkJwtTemplate,
            });

            return token;
        });
    }, [getToken, isLoaded, isSignedIn]);

    return null;
}