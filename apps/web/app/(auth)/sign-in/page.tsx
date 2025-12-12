"use client";

import { AuthCard, AuthHeader } from "@/components/auth/auth-card";
import { AuthInput } from "@/components/auth/auth-input";
import { Button } from "@/components/ui/button";
import { useAuth, useSignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // If already signed-in → redirect
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || isSignedIn) return null;

  const OAUTH_MAP = {
    google: "oauth_google",
    facebook: "oauth_facebook",
    twitter: "oauth_x",
  } as const;

  // Email login - Step 1: Enter email
  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    // Redirect to password page (step 2)
    router.push(`/sign-in/password?email=${encodeURIComponent(email)}`);
  };

  // OAuth login
  const handleOAuth = async (provider: keyof typeof OAUTH_MAP) => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: OAUTH_MAP[provider] as any,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      console.error(err);
      setError(err?.errors?.[0]?.message || "OAuth failed");
    }
  };

  return (
    <AuthCard>
      {/* Header with Logo */}
      <AuthHeader title="Sign in" subtitle="to continue to DevOverflow" />

      {/* Social Login Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => handleOAuth("google")}
          className="flex items-center justify-center w-[67px] h-[67px] rounded-lg bg-light-800 border border-light-700 hover:bg-light-700 transition-colors cursor-pointer"
          aria-label="Login with Google"
        >
          <Image
            src="/social/google.svg"
            alt="Google"
            width={24}
            height={24}
            className="object-contain"
          />
        </button>

        <button
          type="button"
          onClick={() => handleOAuth("facebook")}
          className="flex items-center justify-center w-[67px] h-[67px] rounded-lg bg-light-800 border border-light-700 hover:bg-light-700 transition-colors cursor-pointer"
          aria-label="Login with Facebook"
        >
          <Image
            src="/social/facebook.svg"
            alt="Facebook"
            width={24}
            height={24}
            className="object-contain"
          />
        </button>

        <button
          type="button"
          onClick={() => handleOAuth("twitter")}
          className="flex items-center justify-center w-[67px] h-[67px] rounded-lg bg-light-800 border border-light-700 hover:bg-light-700 transition-colors cursor-pointer"
          aria-label="Login with Twitter"
        >
          <Image
            src="/social/twitter.svg"
            alt="Twitter"
            width={24}
            height={24}
            className="object-contain"
          />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-destructive text-center text-sm mb-4">{error}</p>
      )}

      {/* Email Form */}
      <form onSubmit={handleEmail} className="space-y-6">
        <AuthInput
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <Button
          type="submit"
          className="w-full h-12 rounded-lg font-semibold text-white bg-gradient-to-r from-[#FF7000] to-[#E2995F] hover:opacity-90 transition-opacity cursor-pointer"
        >
          CONTINUE
        </Button>
      </form>

      {/* Footer Links */}
      <div className="flex items-center justify-between mt-8 text-sm">
        <p className="text-dark-400">
          No account?{" "}
          <Link
            href="/sign-up"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
        <div className="flex gap-4 text-dark-400">
          <Link href="#" className="hover:text-dark-500 transition-colors">
            Help
          </Link>
          <Link href="#" className="hover:text-dark-500 transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-dark-500 transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </AuthCard>
  );
}
