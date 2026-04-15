"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";

const usernameRegex = /^[a-zA-Z0-9._-]+$/;

export default function CompleteProfilePage() {
    const router = useRouter();
    const { isLoaded, isSignedIn, user } = useUser();

    const [username, setUsername] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 🔥 Handle auth + redirect logic
    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            router.replace("/sign-in");
            return;
        }

        if (user?.username) {
            router.replace("/dashboard");
            return;
        }

        // ❌ BỎ fallback
        setUsername(""); // luôn trống
    }, [isLoaded, isSignedIn, user, router]);

    // 🔥 Submit handler
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const cleanUsername = username.trim();

        if (cleanUsername.length < 3) {
            setError("Username must be at least 3 characters.");
            return;
        }

        if (cleanUsername.length > 50) {
            setError("Username must be less than 50 characters.");
            return;
        }

        if (!usernameRegex.test(cleanUsername)) {
            setError("Username can only contain letters, numbers, dots, underscores, and hyphens.");
            return;
        }

        if (!isSignedIn || !user) {
            setError("Session not ready. Please wait...");
            return;
        }

        try {
            setIsSubmitting(true);
            setError(null);

            await user.update({ username: cleanUsername });

            router.replace("/dashboard");
        } catch (err: unknown) {
            const fallbackMessage = "Could not update profile. Please try again.";

            if (typeof err === "object" && err !== null && "errors" in err) {
                const clerkErrors = (err as { errors?: Array<{ message?: string }> }).errors;
                setError(clerkErrors?.[0]?.message ?? fallbackMessage);
                return;
            }

            setError(fallbackMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    // 🔥 FIX HYDRATION (QUAN TRỌNG NHẤT)
    if (!isLoaded || !isSignedIn) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-[#f6f6f6]">
                <div className="text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-[#f5f5f5] px-4 py-10 sm:px-6">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full items-center justify-center">
                <div className="relative w-full max-w-md">

                    {/* Ribbon */}
                    <div className="absolute left-0 top-14 -translate-x-full">
                        <div className="clerk-ribbon flex items-center gap-1 text-[10px]">
                            <span>Secured by</span>
                            <Image src="/clerk.svg" width={12} height={12} alt="Clerk" className="invert" />
                            <span>clerk</span>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-[0_24px_70px_rgba(0,0,0,0.12)] sm:p-8">
                        <header className="mb-6">
                            <h1 className="text-[46px] font-bold leading-tight text-gray-900">
                                Fill in missing fields
                            </h1>
                            <p className="mt-2 text-[17px] leading-tight text-gray-500">
                                to continue to DevFlow
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="username" className="text-xs font-medium text-gray-800">
                                    Username
                                </Label>

                                <Input
                                    id="username"
                                    autoComplete="username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                        if (error) setError(null);
                                    }}
                                    className="h-11 rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-orange-500"
                                />
                            </div>

                            {error && <p className="text-sm text-red-500">{error}</p>}

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={`h-11 w-full rounded-lg text-xs font-semibold tracking-wide text-white
    ${isSubmitting || username.trim().length < 3
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-[linear-gradient(90deg,#ff6a00_0%,#ea9b57_100%)] hover:opacity-90"
                                    }
`}
                            >
                                {isSubmitting ? "UPDATING..." : "CONTINUE"}
                            </Button>
                        </form>

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