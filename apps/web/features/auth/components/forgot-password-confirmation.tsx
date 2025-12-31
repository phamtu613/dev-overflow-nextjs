"use client";

import { useRouter } from "next/navigation";
import { useResendOtp } from "../hooks/use-resend-otp";

interface ForgotPasswordConfirmationProps {
    email: string;
}

export function ForgotPasswordConfirmation({ email }: ForgotPasswordConfirmationProps) {
    const router = useRouter();

    const { loading, isSent, resendOtp } = useResendOtp({
        email,
        onSuccess: () => {
            // Optional: Navigate immediately or show toast. 
            // Keeping original logic: Navigate to reset-password
            router.push(`/reset-password?email=${email}`);
        }
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-full max-w-md rounded-2xl bg-[#111] p-8 shadow-lg border border-white/10">
                <h2 className="text-[22px] font-semibold text-white mb-1">
                    Check your email
                </h2>

                <p className="text-gray-400 text-[14px] mb-6 leading-relaxed">
                    We’ve sent password reset instructions to <b>{email}</b>
                </p>

                <button
                    onClick={resendOtp}
                    disabled={loading}
                    className="
            w-full h-[45px] rounded-xl font-medium text-white
            bg-[#FF8A00] hover:bg-[#FF7A00]
            transition-all duration-200
            shadow-[0px_4px_14px_rgba(255,138,0,0.3)]
            disabled:opacity-50 disabled:cursor-not-allowed
          "
                >
                    {loading ? "Sending..." : isSent ? "Sent!" : "Resend"}
                </button>

                <button
                    onClick={() => router.push('/sign-in')}
                    className="
            text-gray-400 text-[14px] mt-4 block text-center
            hover:text-gray-200 transition-all
          "
                >
                    ← Back to login
                </button>
            </div>
        </div>
    );
}
