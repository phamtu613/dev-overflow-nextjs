"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { SignInForm } from "./sign-in-form";
import { SignInSocial } from "./sign-in-social";
import { useRouter } from "next/navigation";
import { useSignInActions } from "@/features/auth/hooks/use-sign-in-actions";

export default function SignInPage() {
    const { isSignedIn } = useUser();
    const router = useRouter();
    const { isLoaded, sendMagicLink, signInWithOAuth } = useSignInActions();

    useEffect(() => {
        if (isSignedIn) {
            router.replace("/");
        }
    }, [isSignedIn, router]);

    if (!isLoaded) {
        return (
            <div className="min-h-screen w-full bg-[#f6f6f6] flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-[#f5f5f5] px-4 py-10 sm:px-6">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full items-center justify-center">
                <div className="relative w-full max-w-md">
                {/* Clerk badge */}
                <div className="absolute left-0 top-28 -translate-x-full -translate-y-1/2">
                    <div className="clerk-ribbon flex items-center gap-1 text-xs">
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
                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.12)] space-y-8">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-8 text-gray-900">
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
                        <h1 className="text-xl font-semibold text-gray-900">Sign in</h1>
                        <p className="text-sm text-gray-500 mb-2">
                            to continue to DevOverflow
                        </p>
                    </header>

                    {/* Social login buttons */}
                    <div className="mt-4">
                        <SignInSocial onOAuth={signInWithOAuth} />
                    </div>

                    {/* Email form */}
                    <SignInForm onSubmit={sendMagicLink} />

                    {/* Footer */}
                    <footer className="flex justify-evenly gap-x-15 text-gray-600">
                        <p>
                            No account?{" "}
                            <Link href="/sign-up" className="text-orange-500 hover:text-orange-600 transition-colors">
                                Sign up
                            </Link>
                        </p>
                        <nav className="flex gap-3">
                            <button className="hover:text-gray-800 transition-colors">
                                Help
                            </button>
                            <button className="hover:text-gray-800 transition-colors">
                                Privacy
                            </button>
                            <button className="hover:text-gray-800 transition-colors">
                                Terms
                            </button>
                        </nav>
                    </footer>
                </div>
            </div>
            </div>
        </div>
    );
}
