"use client";

import { useCallback } from "react";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { SignInForm } from "./sign-in-form";
import { SignInSocial } from "./sign-in-social";
import { OAUTH_PROVIDERS, type OAuthProvider } from "@/features/auth/constants/oauth";

// Constants moved outside component to avoid recreation on each render

export default function SignInPage() {
    const { signIn, isLoaded } = useSignIn();

    // Email login handler with proper error handling
    const handleEmailSubmit = useCallback(
        async (email: string) => {
            if (!signIn) throw new Error("Sign in not initialized");

            const signInResponse = await signIn.create({ identifier: email });

            const emailFactor = signInResponse.supportedFirstFactors?.find(
                (factor) => factor.strategy === "email_code"
            );

            if (!emailFactor || emailFactor.strategy !== "email_code") {
                throw new Error("Email code authentication not supported");
            }

            await signIn.prepareFirstFactor({
                strategy: "email_code",
                emailAddressId: emailFactor.emailAddressId,
            });

            window.location.href = "/verify-email";
        },
        [signIn]
    );

    // OAuth login handler with proper error handling
    const handleOAuth = useCallback(
        async (provider: OAuthProvider) => {
            if (!signIn) throw new Error("Sign in not initialized");

            await signIn.authenticateWithRedirect({
                strategy: OAUTH_PROVIDERS[provider].strategy,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
            });
        },
        [signIn]
    );

    if (!isLoaded) {
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-black bg-[url('/bg_stackoverflow.svg')] bg-no-repeat bg-cover flex items-center justify-center relative">
            {/* Background blur effects */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="h-96 w-96 bg-orange-500 rounded-full blur-[150px] absolute top-10 left-20" />
                <div className="h-96 w-96 bg-blue-500 rounded-full blur-[160px] absolute bottom-10 right-20" />
            </div>

            {/* Main card container */}
            <div className="relative">
                {/* Clerk badge */}
                <div className="absolute left-0 top-28 -translate-x-full -translate-y-1/2">
                    <div className="clerk-ribbon flex items-center gap-1 text-xs opacity-70">
                        <span>Secured by</span>
                        <Image
                            src="/clerk.svg"
                            width={14}
                            height={14}
                            className="invert"
                            alt="Clerk"
                        />
                        <span>Clerk</span>
                    </div>
                </div>


                {/* Sign in card */}
                <div className="relative w-full max-w-md bg-[#1a1d29]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 px-8 py-10 space-y-8">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-8 text-white">
                        <Image
                            src="/logo.svg"
                            width={40}
                            height={40}
                            className="object-cover"
                            alt="DevOverflow Logo"
                        />
                        <p className="text-[24.8px]">
                            Dev<strong className="text-accent">Overflow</strong>
                        </p>
                    </div>

                    {/* Header */}
                    <header className="flex flex-col">
                        <h1 className="text-xl font-semibold text-white">Sign in</h1>
                        <p className="text-sm text-gray-400 mb-2">
                            to continue to DevOverflow
                        </p>
                    </header>

                    {/* Social login buttons */}
                    <div className="mt-4">
                        <SignInSocial onOAuth={handleOAuth} />
                    </div>

                    {/* Email form */}
                    <SignInForm onSubmit={handleEmailSubmit} />

                    {/* Footer */}
                    <footer className="flex justify-evenly gap-x-15">
                        <p>
                            No account?{" "}
                            <Link href="/sign-up" className="text-orange-400 hover:text-orange-300 transition-colors">
                                Sign up
                            </Link>
                        </p>
                        <nav className="flex gap-3">
                            <button className="hover:text-gray-300 transition-colors">
                                Help
                            </button>
                            <button className="hover:text-gray-300 transition-colors">
                                Privacy
                            </button>
                            <button className="hover:text-gray-300 transition-colors">
                                Terms
                            </button>
                        </nav>
                    </footer>
                </div>
            </div>
        </div>
    );
}