"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SsoCallback() {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;

        // Login thành công → về /
        if (isSignedIn) {
            router.replace("/");
            return;
        }

        // Fallback: không login được → về sign-in
        const t = setTimeout(() => {
            router.replace("/dashboard");
        }, 2000);

        return () => clearTimeout(t);
    }, [isLoaded, isSignedIn, router]);

    return (
        <div className="h-screen flex items-center justify-center text-white">
            Signing you in…
        </div>
    );
}
