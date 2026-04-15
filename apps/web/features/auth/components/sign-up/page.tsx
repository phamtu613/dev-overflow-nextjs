"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { SignUpForm } from "./sign-up-form";
import { SignUpSocial } from "./sign-up-social";

import { useSignUpForm } from "../../hooks/use-sign-up-form";
import { useSignInActions } from "../../hooks/use-sign-in-actions";

export default function SignUpPage() {
    const { isSignedIn } = useUser();
    const router = useRouter();
    const { form, onSubmit, error, isSubmitting } = useSignUpForm();
    const { signInWithOAuth, isLoaded } = useSignInActions();

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
        <div id="clerk-captcha" className="relative min-h-screen w-full bg-[#f5f5f5] px-4 py-10 sm:px-6">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full items-center justify-center">
                <div className="relative w-full max-w-md">
                    <div className="absolute left-0 top-28 -translate-x-full">
                        <div className="clerk-ribbon flex items-center gap-1 text-[10px]">
                            <span>Secured by</span>
                            <Image src="/clerk.svg" width={12} height={12} alt="Clerk" className="invert" />
                            <span>clerk</span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_24px_70px_rgba(0,0,0,0.12)] sm:p-8">
                        <header className="mb-6">
                            <h1 className="text-[38px] font-bold leading-tight text-gray-900">Create your account</h1>
                            <p className="mt-2 text-[30px] leading-tight text-gray-500">to continue to DevFlow</p>
                        </header>

                        <SignUpSocial onOAuth={signInWithOAuth} />

                        <div className="my-6 flex items-center gap-4 text-gray-400">
                            <span className="h-px flex-1 bg-gray-200" />
                            <span className="text-sm">or</span>
                            <span className="h-px flex-1 bg-gray-200" />
                        </div>

                        <SignUpForm
                            form={form}
                            onSubmit={onSubmit}
                            error={error}
                            isSubmitting={isSubmitting}
                        />

                        <footer className="mt-6 text-sm text-gray-500">
                            Have an account?{" "}
                            <Link href="/sign-in" className="font-medium text-orange-500 hover:text-orange-600">
                                Sign in
                            </Link>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}
