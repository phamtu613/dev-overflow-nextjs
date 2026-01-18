"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getMailProvider } from "../../utils/mail-provider";
import { useCountdown } from "../../hooks/use-countdown";
import { useResendMagicLink } from "../../hooks/use-resend-magic-link";
import Image from "next/image";


export default function CheckEmailPage() {
    const params = useSearchParams();
    const email = params.get("email");
    const emailAddressId = params.get("emailId");

    const mailProvider = useMemo(
        () => getMailProvider(email),
        [email]
    );

    const { countdown, reset } = useCountdown(30);
    const { resend, loading } = useResendMagicLink();

    const handleResend = async () => {
        await resend(emailAddressId);
        reset();
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
