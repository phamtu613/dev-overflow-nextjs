"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const { isLoaded, signIn } = useSignIn();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  if (!isLoaded) return null;

  // VERIFY CODE
  const handleVerify = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (result.status === "complete") {
        router.push("/");
      } else {
        setError("Invalid code");
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Verification failed");
    }
  };

  // RESEND CODE
  const handleResend = async () => {
    setError("");

    try {
      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId: signIn.identifier!,
      });
    } catch (err: any) {
      setError("Could not resend code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-[#1a1d29]/90 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
        <h1 className="text-xl font-semibold mb-2">Verify your email</h1>
        <p className="text-gray-400 mb-6">
          Enter the 6-digit code we sent to your email.
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={code}
            maxLength={6}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#151821] text-center tracking-[0.5em] text-xl focus:outline-none focus:border-[#FF7000] focus:border-b-2"
            placeholder="______"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold shadow-lg text-white transition bg-[linear-gradient(90deg,#FF7000,#E2985E,#E2995F)] hover:opacity-90"
          >
            Verify
          </button>
        </form>

        <button
          onClick={handleResend}
          className="mt-4 text-sm text-orange-400 hover:underline w-full text-center"
        >
          Resend code
        </button>
      </div>
    </div>
  );
}
