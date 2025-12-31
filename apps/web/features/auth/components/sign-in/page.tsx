"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SignInForm } from "./sign-in-form";
import { SignInSocial } from "./sign-in-social";
import { useSignInActions } from "../../hooks/use-sign-in-actions";

export default function SignInPage() {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    const {
        signInWithOAuth,
        sendMagicLink,
    } = useSignInActions();

    // ✅ Redirect nếu đã login
    useEffect(() => {
        if (isLoaded && isSignedIn) {
            router.replace("/dashboard");
        }
    }, [isLoaded, isSignedIn, router]);

    // ⛔ Chưa load Clerk → không render gì
    if (!isLoaded) return null;

    // ⛔ Đã login → không render form
    if (isSignedIn) return null;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md space-y-8">

                {/* OAuth */}
                <SignInSocial onOAuth={signInWithOAuth} />

                {/* Divider */}
                <div className="text-center text-gray-400 text-sm">
                    or continue with email
                </div>

                {/* Magic link form */}
                <SignInForm onSubmit={sendMagicLink} />

            </div>
        </div>
    );
}
