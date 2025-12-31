"use client";

import { useClerk } from "@clerk/nextjs";
import { useState } from "react";

interface UseResendOtpProps {
    email: string;
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
}

export function useResendOtp({ email, onSuccess, onError }: UseResendOtpProps) {
    const { client } = useClerk();
    const [loading, setLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const resendOtp = async () => {
        if (!email) return;

        try {
            setLoading(true);

            const attempt = await client.signIn.create({
                identifier: email,
            });

            const factor = attempt.supportedFirstFactors?.find(
                (f) => f.strategy === "reset_password_email_code"
            );

            if (factor && "emailAddressId" in factor) {
                await client.signIn.prepareFirstFactor({
                    strategy: "reset_password_email_code",
                    emailAddressId: factor.emailAddressId as string,
                });

                setIsSent(true);
                if (onSuccess) onSuccess();
            } else {
                throw new Error("Reset password strategy not supported for this account.");
            }
        } catch (err) {
            console.error("Resend OTP Error:", err);
            if (onError) onError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        isSent,
        resendOtp,
    };
}
