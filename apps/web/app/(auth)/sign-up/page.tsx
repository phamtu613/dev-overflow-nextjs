"use client";

import { useState } from "react";
import { useSignUp, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();

  // Clerk hooks
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Clerk chưa load xong → tránh lỗi
  if (!signUpLoaded || !signInLoaded) return null;

  // ------------------------
  // EMAIL SIGNUP FLOW
  // ------------------------
  const handleEmailSignup = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signUp.create({
        username,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(err?.errors?.[0]?.message || "Something went wrong");
    }
  };

  // ------------------------
  // OAUTH SIGNUP FLOW (Google / GitHub)
  // ------------------------
  const loginWith = async (provider: "github" | "google") => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  // ------------------------
  // UI
  // ------------------------
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md rounded-2xl bg-[#111] p-8 shadow-lg border border-white/10">
        <h2 className="text-2xl font-semibold text-white">
          Create your account
        </h2>
        <p className="text-gray-400 mb-6">to continue to DevFlow</p>

        <form onSubmit={handleEmailSignup} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm">Username</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Email address</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600"
          >
            Continue
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="/sign-in" className="text-orange-400">
            Sign in
          </a>
        </p>

        {/* 🔥 OAuth */}
        <div className="flex justify-between items-center pt-5 space-x-3">
          <button
            onClick={() => loginWith("github")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#222]"
          >
            <img src="/social/github-mark.svg" className="w-5 h-5" />
            Login with GitHub
          </button>

          <button
            onClick={() => loginWith("google")}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#222]"
          >
            <img src="/social/google.svg" className="w-5 h-5" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
