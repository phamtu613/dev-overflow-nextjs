import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";

export function useResendMagicLink() {
    const { signIn } = useSignIn();
    const [loading, setLoading] = useState(false);

    const resend = async (emailAddressId?: string | null) => {
        if (!signIn || !emailAddressId) return;

        try {
            setLoading(true);

            await signIn.prepareFirstFactor({
                strategy: "email_link",
                emailAddressId,
                redirectUrl: `${window.location.origin}/sign-in/sso-callback`,
            });
        } finally {
            setLoading(false);
        }
    };

    return { resend, loading };
}
