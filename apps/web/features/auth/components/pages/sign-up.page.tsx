"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AuthForm } from "../shared/auth-email-form/auth-form";


export default function SignUpPage() {
    const { isSignedIn } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isSignedIn) {
            router.replace("/");
        }
    }, [isSignedIn, router]);

    return (
        <div className="min-h-screen w-full bg-black bg-[url('/bg_stackoverflow.svg')] bg-no-repeat bg-cover flex items-center justify-center relative">
            {/* Background blur */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="h-96 w-96 bg-orange-500 rounded-full blur-[150px] absolute top-10 left-20" />
                <div className="h-96 w-96 bg-blue-500 rounded-full blur-[160px] absolute bottom-10 right-20" />
            </div>

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

                {/* Card */}
                <div className="relative w-full max-w-md bg-[#1a1d29]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 px-8 py-10 space-y-8">

                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-8 text-white">
                        <Image
                            src="/logo.svg"
                            width={40}
                            height={40}
                            alt="DevOverflow"
                        />
                        <p className="text-[24.8px]">
                            Dev<strong className="text-accent">Overflow</strong>
                        </p>
                    </div>

                    {/* Header */}
                    <header>
                        <h1 className="text-xl font-semibold text-white">
                            Create account
                        </h1>
                        <p className="text-sm text-gray-400">
                            Join DevOverflow to ask & share knowledge
                        </p>
                    </header>

                    {/* 👉 AUTH FORM */}
                    <AuthForm mode="signup" />

                    {/* Footer */}
                    <footer className="flex justify-between text-sm">
                        <p>
                            Already have an account?{" "}
                            <Link
                                href="/sign-in"
                                className="text-orange-400 hover:text-orange-300"
                            >
                                Sign in
                            </Link>
                        </p>

                        <nav className="flex gap-3">
                            <button>Help</button>
                            <button>Privacy</button>
                            <button>Terms</button>
                        </nav>
                    </footer>
                </div>
            </div>
        </div>
    );
}
