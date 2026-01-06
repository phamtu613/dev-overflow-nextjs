"use client";

import { useSearchParams } from "next/navigation";

export default function CheckEmailPage() {
    const params = useSearchParams();
    const email = params.get("email");
    console.log(email)
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md text-center space-y-4">
                <h1 className="text-xl font-semibold">
                    Check your email
                </h1>

                <p className="text-sm text-muted-foreground">
                    {email
                        ? `We sent a magic link to ${email}`
                        : "We sent you a magic link"}
                </p>

                <p className="text-xs text-muted-foreground">
                    Open your inbox and click the link to sign in.
                </p>
            </div>
        </div>
    );
}
