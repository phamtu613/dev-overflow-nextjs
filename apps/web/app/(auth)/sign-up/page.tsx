"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    const { signUp, isLoaded } = useSignUp();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    if (!isLoaded) return null;

    const OAUTH_MAP = {
        google: "oauth_google",
        facebook: "oauth_facebook",
        twitter: "oauth_x",
    } as const;

    // OAuth Handler
    const handleOAuth = async (provider: keyof typeof OAUTH_MAP) => {
        try {
            await signUp.authenticateWithRedirect({
                strategy: OAUTH_MAP[provider],
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
            });
        } catch (err: any) {
            setError(err?.errors?.[0]?.message || "OAuth failed");
        }
    };

    // Email + Password Signup Handler
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
                username: form.username,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            window.location.href = "/verify-email";
        } catch (err: any) {
            setError(err?.errors?.[0]?.message || "Sign-up failed");
        }
    };

    return (
        <div className="min-h-screen w-full bg-black bg-[url('/bg_stackoverflow.svg')] bg-no-repeat bg-cover flex items-center justify-center relative overflow-visible">

            {/* Clerk ribbon (vertical like Figma) */}
            {/* <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full z-[9999]">
                <div className="clerk-ribbon flex flex-col items-center gap-1 px-2 py-3 
                            whitespace-nowrap writing-vertical text-[11px] font-semibold">
                    Secured by
                    <img
                        src="/clerk.svg"
                        className="w-4 h-4 invert brightness-0"
                        alt="clerk"
                    />
                    Clerk
                </div>
            </div> */}


            {/* Background blobs */}
            <div className="absolute inset-0 opacity-20">
                <div className="h-96 w-96 bg-orange-500 rounded-full blur-[150px] absolute top-10 left-20"></div>
                <div className="h-96 w-96 bg-blue-500 rounded-full blur-[160px] absolute bottom-10 right-20"></div>
            </div>

            {/* Sign Up Card */}
            <div className="relative w-full max-w-md bg-[#1a1d29]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 px-8 py-10 space-y-8">

                {/* Logo */}
                <div className="flex items-center gap-3 mb-8 text-white">
                    <img src="/logo.svg" alt="logo" className="h-10 w-10 object-cover" />
                    <p className="text-[24.8px]">Dev<strong className="text-accent">Overflow</strong></p>
                </div>

                {/* Title */}
                <div className="flex flex-col">
                    <h1 className="text-xl font-semibold text-white">Create your account</h1>
                    <p className="text-sm text-gray-400 mb-2">
                        to continue to DevOverflow
                    </p>
                </div>

                {/* Social */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => handleOAuth("google")}
                        className="w-12 h-12 bg-[#11131a] border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#181b22]"
                    >
                        <img src="/social/google.svg" className="h-5 w-5" />
                    </button>

                    <button
                        onClick={() => handleOAuth("facebook")}
                        className="w-12 h-12 bg-[#11131a] border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#181b22]"
                    >
                        <img src="/social/facebook.svg" className="h-5" />
                    </button>

                    <button
                        onClick={() => handleOAuth("twitter")}
                        className="w-12 h-12 bg-[#11131a] border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#181b22]"
                    >
                        <img src="/social/twitter.svg" className="w-4.5 h-4.5" />
                    </button>
                </div>

                {error && <p className="text-red-400 text-center text-sm">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 text-white">

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-300 text-sm">Username</label>
                        <input
                            className="w-full px-4 py-3 bg-[#151821] rounded-xl text-white focus:border-[#FF7000] focus:border-b-2 focus:outline-none focus:ring-0 focus:shadow-[0_2px_0_0_#FF7000] transition-all"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-300 text-sm">Email address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-[#151821] rounded-xl text-white focus:border-[#FF7000] focus:border-b-2 focus:outline-none focus:ring-0 focus:shadow-[0_2px_0_0_#FF7000] transition-all"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-gray-300 text-sm">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-[#151821] rounded-xl text-white focus:border-[#FF7000] focus:border-b-2 focus:outline-none focus:ring-0 focus:shadow-[0_2px_0_0_#FF7000] transition-all"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl font-semibold shadow-lg text-white transition bg-[linear-gradient(90deg,#FF7000,#E2985E,#E2995F)] hover:opacity-90 text-[15px]"
                    >
                        Continue
                    </button>
                </form>

                {/* Footer */}
                <div className="flex justify-between text-gray-500 text-sm pt-4">
                    <div>
                        Already have an account?{" "}
                        <a href="/sign-in" className="text-orange-400">
                            Sign in
                        </a>
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
