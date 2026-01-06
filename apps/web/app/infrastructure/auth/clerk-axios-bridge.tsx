"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

export function ClerkAxiosBridge() {
    const { isSignedIn, isLoaded, getToken } = useAuth();

    useEffect(() => {
        if (!isLoaded) return;

        console.log("isSignedIn:", isSignedIn);
        console.log("session:", window.Clerk.session);

        getToken({ template: "backend-test" }).then((token) => {
            console.log("internal token:", token);
        });
    }, [isLoaded, isSignedIn, getToken]);

    return null;
}
