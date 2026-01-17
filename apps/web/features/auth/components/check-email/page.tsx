// check-email.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function CheckEmailPage() {
    const params = useSearchParams();
    const email = params.get("email");

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-3">
                <h2 className="text-lg font-semibold">Check your email</h2>

                <p className="text-sm text-gray-500">
                    We sent a magic link to <br />
                    <b>{email}</b>
                </p>

                <p className="text-xs text-gray-400">
                    Open your inbox and click the link to sign in.
                </p>

                <a
                    href="https://mail.google.com"
                    target="_blank"
                    className="text-sm underline"
                >
                    Open Gmail
                </a>
            </div>
        </div>
    );
}
