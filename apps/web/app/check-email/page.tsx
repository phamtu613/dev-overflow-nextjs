"use client";

import { useSearchParams } from "next/navigation";

export default function CheckEmailPage() {
    const params = useSearchParams();
    const email = params.get("email");

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-2xl shadow-sm text-center space-y-5">
                
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100">
                        📩
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-semibold text-gray-900">
                    Check your email
                </h1>

                {/* Description */}
                <p className="text-sm text-gray-600">
                    {email
                        ? `We sent a magic link to `
                        : "We sent you a magic link"}
                    {email && (
                        <span className="font-medium text-gray-900">
                            {email}
                        </span>
                    )}
                </p>

                <p className="text-xs text-gray-500">
                    Open your inbox and click the link to sign in.
                </p>

                {/* Divider */}
                <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400">
                        Didn’t receive the email? Check your spam folder or try again.
                    </p>
                </div>
            </div>
        </div>
    );
}