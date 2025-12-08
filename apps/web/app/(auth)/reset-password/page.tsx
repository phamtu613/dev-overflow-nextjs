"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { client } = useClerk();

  const email = params.get("email") ?? "";

  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      await client.signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      setLoading(false);

      router.push("/sign-in?reset=success");
    } catch (err: any) {
      console.log(err);
      setLoading(false);
      setError(err?.errors?.[0]?.message || "Password reset failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md rounded-2xl bg-[#111] p-8 shadow-lg border border-white/10">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Set new password
        </h2>

        <p className="text-gray-400 mb-6">New password must be different</p>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-white"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Confirm password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold"
          >
            {loading ? "Updating..." : "Reset password"}
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
