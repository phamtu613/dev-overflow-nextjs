"use client";

import { AuthCard, AuthHeader } from "@/components/auth/auth-card";
import { AuthInput } from "@/components/auth/auth-input";
import { Button } from "@repo/ui/button";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!signUpLoaded || !signInLoaded) return null;

  // Email Signup Flow
  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUp.create({
        username,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      router.push("/verify-email");
    } catch (err: any) {
      console.error(err);
      setError(err?.errors?.[0]?.message || "Something went wrong");
    }
  };

  // OAuth Signup Flow
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

  return (
    <AuthCard>
      {/* Header with Logo */}
      <AuthHeader
        title="Create your account"
        subtitle="to continue to DevOverflow"
      />

      {/* Sign Up Form */}
      <form onSubmit={handleEmailSignup} className="space-y-5">
        <AuthInput
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />

        <AuthInput
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <AuthInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        {error && <p className="text-destructive text-sm">{error}</p>}

        <Button
          type="submit"
          className="w-full h-12 rounded-lg font-semibold text-white bg-linear-to-r from-[#FF7000] to-[#E2995F] hover:opacity-90 transition-opacity cursor-pointer"
        >
          CONTINUE
        </Button>
      </form>

      {/* Footer Link */}
      <p className="text-center text-sm text-dark-400 mt-6">
        Already have an account?{" "}
        <a href="/sign-in" className="text-primary font-medium hover:underline">
          Sign in
        </a>
      </p>

      {/* OAuth Buttons */}
      <div className="flex gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => loginWith("github")}
          className="flex-1 flex items-center justify-center gap-2.5 h-12 rounded-lg bg-light-900 border-light-700 text-dark-200 font-medium text-sm hover:bg-light-800 transition-colors cursor-pointer"
        >
          <Image
            src="/social/github-mark.svg"
            alt="GitHub"
            width={20}
            height={20}
            className="object-contain"
          />
          <span>Login with GitHub</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => loginWith("google")}
          className="flex-1 flex items-center justify-center gap-2.5 h-12 rounded-lg bg-light-900 border-light-700 text-dark-200 font-medium text-sm hover:bg-light-800 transition-colors cursor-pointer"
        >
          <Image
            src="/social/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="object-contain"
          />
          <span>Login with Google</span>
        </Button>
      </div>
    </AuthCard>
  );
}
