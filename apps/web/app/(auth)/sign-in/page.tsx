"use client";

import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { isSignedIn } = useAuth();

  // IF ALREADY SIGNED-IN → REDIRECT USING EFFECT
  const router = useRouter();

  // Nếu đã login → redirect
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded || isSignedIn) return null;
  if (!isLoaded) return null;
  const OAUTH_MAP = {
    google: "oauth_google",
    facebook: "oauth_facebook",
    twitter: "oauth_x", // 👈 KHÁC HOÀN TOÀN
  } as const;
  // Email login
  const handleEmail = async (e: any) => {
    e.preventDefault();

    // Không gọi Clerk signIn.create ở đây
    // Vì đây chỉ là step 1 của flow: nhập email -> sang trang password

    if (!email) {
      setError("Email is required");
      return;
    }

    // Redirect tới trang password (step 2)
    window.location.href = `/sign-in/password?email=${encodeURIComponent(email)}`;
  };

  // OAuth login
  const handleOAuth = async (provider: keyof typeof OAUTH_MAP) => {
    try {
      await signIn.authenticateWithRedirect({
        // cast to any because Clerk expects a narrow union type for strategy
        strategy: OAUTH_MAP[provider] as any,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      console.log(err);
      setError(err?.errors?.[0]?.message || "OAuth failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-black bg-[url('/bg_stackoverflow.svg')] bg-no-repeat bg-cover flex items-center justify-center relative">
      <div className="relative">
        {/* BADGE — nằm ngoài card, không bị overflow hidden */}
        <div className="absolute left-0 bottom-12 -translate-x-full -translate-y-2/3">
          <div className="clerk-ribbon flex items-center gap-1 whitespace-nowrap">
            Secured by
            <img
              src="/clerk.svg"
              className="w-3 h-3 invert brightness-0 rotate-90"
              alt="clerk"
            />
            Clerk
          </div>
        </div>
      </div>
      <div className="absolute inset-0 opacity-20">
        <div className="h-96 w-96 bg-orange-500 rounded-full blur-[150px] absolute top-10 left-20"></div>
        <div className="h-96 w-96 bg-blue-500 rounded-full blur-[160px] absolute bottom-10 right-20"></div>
      </div>

      <div className="relative w-full max-w-md bg-[#1a1d29]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 px-8 py-10 space-y-8">
        <div className="flex items-center gap-3 mb-8 text-white">
          <img src="/logo.svg" alt="logo" className="h-10 w-10 object-cover" />
          <p className="text-[24.8px]">
            Dev<strong className="text-accent">Overflow</strong>
          </p>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-white">Sign in</h1>
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
            <img src="/social/google.svg" className="h-5 w-5 to-blue-900" />
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

        {/* Email input */}
        <form onSubmit={handleEmail} className="space-y-4">
          <label className="text-gray-300 text-sm mb-2">Email address</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
    w-full px-4 py-3 
    bg-[#151821]
    rounded-xl
    text-white
    focus:border-[#FF7000]
    focus:border-b-2
    caret-[#FF7000]
    focus:outline-none
    focus:ring-0
    focus-visible:ring-0
    focus:shadow-[0_2px_0_0_#FF7000]
    transition-all duration-200
  "
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold shadow-lg text-white transition
            bg-[linear-gradient(90deg,#FF7000,#E2985E,#E2995F)] hover:opacity-90 text-[15px]"
          >
            CONTINUE
          </button>
        </form>

        <div className="flex justify-between text-gray-500 text-sm pt-4">
          <div>
            <p className="text-center text-gray-400 text-sm">
              No account?{" "}
              <a href="/sign-up" className="text-orange-400">
                Sign up
              </a>
            </p>
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
