"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import Image from "next/image";

/* detect mail provider */
function getMailProvider(email?: string | null) {
    if (!email) {
        return { label: "Open inbox", url: "https://mail.google.com" };
    }

    const domain = email.split("@")[1];

    if (domain === "gmail.com") {
        return { label: "Open Gmail", url: "https://mail.google.com" };
    }

    if (domain === "outlook.com" || domain === "hotmail.com") {
        return {
            label: "Open Outlook",
            url: "https://outlook.live.com/mail/",
        };
    }

    if (domain === "yahoo.com") {
        return { label: "Open Yahoo Mail", url: "https://mail.yahoo.com" };
    }

    return {
        label: `Open ${domain}`,
        url: `https://${domain}`,
    };
}

export default function CheckEmailPage() {
    const params = useSearchParams();
    const email = params.get("email");
    const emailAddressId = params.get("emailId");

    const { signIn } = useSignIn();

    const [countdown, setCountdown] = useState(30);
    const [loading, setLoading] = useState(false);

    const mailProvider = useMemo(
        () => getMailProvider(email),
        [email]
    );

    /* countdown */
    useEffect(() => {
        if (countdown <= 0) return;

        const timer = setInterval(() => {
            setCountdown((c) => c - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    /* resend */
    const handleResend = async () => {
        if (!signIn || !emailAddressId) return;

        try {
            setLoading(true);

            await signIn.prepareFirstFactor({
                strategy: "email_link",
                emailAddressId,
                redirectUrl: `${window.location.origin}/sign-in/sso-callback`,
            });

            setCountdown(30);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative">

            {/* blur bg */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/30 blur-[120px]" />
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/30 blur-[120px]" />
            </div>

            {/* card */}
            <div className="relative w-full max-w-sm bg-[#151821] rounded-2xl p-8 border border-white/10 shadow-2xl text-center space-y-4">

                {/* logo */}
                <div className="flex justify-center">
                    <Image
                        src="/logo.svg"
                        width={36}
                        height={36}
                        alt="logo"
                    />
                </div>

                <h2 className="text-lg font-semibold text-white">
                    Check your email
                </h2>

                <p className="text-sm text-gray-400">
                    We sent a magic link to
                </p>

                <p className="text-sm text-white font-medium break-all">
                    {email}
                </p>

                <p className="text-xs text-gray-500">
                    Open your inbox and click the link to sign in.
                    <br />
                    Check spam if you don’t see it.
                </p>

                {/* open mail */}
                <a
                    href={mailProvider.url}
                    target="_blank"
                    className="text-sm text-orange-400 hover:underline"
                >
                    {mailProvider.label}
                </a>

                {/* resend */}
                <div>
                    <button
                        onClick={handleResend}
                        disabled={loading || countdown > 0}
                        className="
                            text-sm text-gray-400 
                            hover:text-orange-400
                            disabled:opacity-50
                            transition
                        "
                    >
                        {countdown > 0
                            ? `Resend in ${countdown}s`
                            : "Resend magic link"}
                    </button>
                </div>
            </div>
        </div>
    );
}
