"use client";

import { useState } from "react";
import { useSignUp, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
    const { isLoaded, signUp } = useSignUp();
    const { setActive } = useClerk();
    const router = useRouter();

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isLoaded || !signUp) return null;

    async function verify() {
        try {
            setLoading(true);

            const otp = code.join("");

            const result = await signUp?.attemptEmailAddressVerification({
                code: otp,
            });

            // verify success - set the active session
            if (result?.status === "complete" && result.createdSessionId) {
                await setActive({ session: result.createdSessionId });
            }
            router.push("/sign-in");
        } catch (err: any) {
            setError(err.errors?.[0]?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    }

    function handleOtp(i: number, val: string) {
        if (!/^\d?$/.test(val)) return;

        const next = [...code];
        next[i] = val;
        setCode(next);

        if (val && i < 5) {
            document.getElementById(`otp-${i + 1}`)?.focus();
        }
    }

    async function resend() {
        if (!signUp) return;

        await signUp.prepareEmailAddressVerification({
            strategy: "email_code",
        });
    }

    return (
        <div className="max-w-sm mx-auto mt-24 space-y-6 text-white">
            <h1 className="text-xl font-semibold text-center">
                Verify your email
            </h1>

            <div className="flex justify-between">
                {code.map((v, i) => (
                    <input
                        key={i}
                        id={`otp-${i}`}
                        value={v}
                        maxLength={1}
                        onChange={e => handleOtp(i, e.target.value)}
                        className="w-10 h-10 text-center border rounded text-lg"
                    />
                ))}
            </div>

            {error && (
                <p className="text-red-500 text-sm text-center">
                    {error}
                </p>
            )}

            <button
                onClick={verify}
                disabled={loading}
                className="w-full bg-black text-white p-2 rounded"
            >
                Verify
            </button>

            <button
                onClick={resend}
                className="w-full text-blue-600 text-sm"
            >
                Resend code
            </button>
        </div>
    );
}
