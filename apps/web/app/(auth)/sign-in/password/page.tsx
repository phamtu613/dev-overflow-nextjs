"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPasswordPage() {
    const params = useSearchParams();
    const email = params.get("email") ?? "";

    const router = useRouter();
    const { signIn, isLoaded } = useSignIn();

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    if (!isLoaded) return null;

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const res = await signIn.create({
                identifier: email,
                password,
            });

            if (res.status === "complete") {
                router.push("/");
            }
        } catch (err: any) {
            setError(err?.errors?.[0]?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen w-full bg-black bg-[url('/bg_stackoverflow.svg')] bg-no-repeat bg-cover flex items-center justify-center relative">

            {/* Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="h-96 w-96 bg-orange-500 rounded-full blur-[150px] absolute top-10 left-20"></div>
                <div className="h-96 w-96 bg-blue-500 rounded-full blur-[160px] absolute bottom-10 right-20"></div>
            </div>

            {/* Card */}
            <div className="relative w-full max-w-md bg-[#1a1d29]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 px-8 py-10 space-y-8">

                {/* Logo */}
                <div className="flex items-center gap-3 mb-8 text-white">
                    <img src="/logo.svg" alt="logo" className="h-10 w-10 object-cover" />
                    <p className="text-[24.8px]">Dev<strong className="text-accent">Overflow</strong></p>
                </div>

                {/* Title */}
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold text-white">Sign in</h1>
                    <p className="text-sm text-gray-400 mb-2">to continue to DevOverflow</p>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                {/* FORM FIXED */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="text-gray-300 text-sm">Email address</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            className="
                w-full px-4 py-3 bg-[#151821]
                rounded-xl text-white opacity-70 cursor-not-allowed
                focus:outline-none
              "
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-gray-300 text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="
                w-full px-4 py-3 bg-[#151821]
                rounded-xl text-white
                focus:border-[#FF7000]
                focus:border-b-2
                focus:outline-none
                transition-all
              "
                            required
                        />
                    </div>
                    <p
                        onClick={() => router.push("/forgot-password")}
                        className="text-[#1DA1F2] text-[14px] flex items-center justify-end cursor-pointer mt-3 hover:underline"
                    >
                        Forgot password?
                    </p>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold shadow-lg text-white
              bg-[linear-gradient(90deg,#FF7000,#E2985E,#E2995F)]
              hover:opacity-90 text-[15px]"
                    >
                        CONTINUE
                    </button>
                </form>

                {/* Footer */}
                <div className="flex justify-between text-gray-500 text-sm pt-4">
                    <div>
                        No account? <a href="/sign-up" className="text-orange-400">Sign up</a>
                    </div>
                    <div className="flex gap-3">
                        <button>Help</button>
                        <button>Privacy</button>
                        <button>Terms</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
