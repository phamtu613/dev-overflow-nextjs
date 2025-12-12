"use client";

import { useSignIn } from "@clerk/nextjs";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignInPasswordPage() {
  const params = useSearchParams();
  const email = params.get("email") ?? "";

  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoaded) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      {/* Card */}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white px-8 py-10 shadow-xl">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <img src="/logo.svg" alt="logo" className="size-10 object-cover" />
          <p className="text-2xl font-medium text-gray-900">
            Dev<span className="font-bold text-primary">Overflow</span>
          </p>
        </div>

        {/* Title */}
        <div className="mb-6 flex flex-col">
          <h1 className="text-xl font-semibold text-gray-900">
            Enter your password
          </h1>
          <p className="text-sm text-gray-500">to continue to DevOverflow</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email (Read-only) */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={email}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-12 text-gray-900 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-linear-to-r from-primary to-[#E2995F] py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Continue"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6 text-sm text-gray-500">
          <div>
            No account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Sign up
            </Link>
          </div>
          <div className="flex gap-3">
            <button className="transition-colors hover:text-gray-700">
              Help
            </button>
            <button className="transition-colors hover:text-gray-700">
              Privacy
            </button>
            <button className="transition-colors hover:text-gray-700">
              Terms
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
