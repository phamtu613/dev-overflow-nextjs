"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { client } = useClerk();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const attempt = await client.signIn.create({
        identifier: email,
      });

      const factor = attempt.supportedFirstFactors?.find(
        (f) => f.strategy === "reset_password_email_code"
      );

      await client.signIn.prepareFirstFactor({
        strategy: "reset_password_email_code",
        emailAddressId: (factor as any).emailAddressId,
      });

      router.push(`/forgot-password/confirmation?email=${email}`);
    } catch (err: any) {
      console.log(err);
      setError(err?.errors?.[0]?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-lg rounded-2xl bg-[#111] p-8 border border-white/10 shadow-lg">
<<<<<<< HEAD
        <h2 className="text-2xl font-semibold text-white mb-2">
          Forgot password?
        </h2>
=======

        <h2 className="text-2xl font-semibold text-white mb-2">Forgot password?</h2>
>>>>>>> main
        <p className="text-gray-400 mb-6">
          No worries, we’ll send you reset instructions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-gray-300 text-sm">Email address</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl bg-[#1b1b1b] border border-white/10 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold"
          >
            Continue
          </button>
        </form>

        <button
          onClick={() => router.push("/sign-in")}
          className="text-gray-400 text-sm mt-4 block text-center hover:text-gray-200"
        >
          ← Back to login
        </button>
      </div>
    </div>
  );
}
