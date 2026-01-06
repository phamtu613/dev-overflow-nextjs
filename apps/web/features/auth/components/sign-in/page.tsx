"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMagicLink } from "../../hooks/use-magic-link";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const { sendMagicLink } = useMagicLink();

    const onSubmit = async () => {
        await sendMagicLink(email);

        // 👉 Sau khi gửi xong → sang trang check email
        router.push("/check-email?email=" + encodeURIComponent(email));
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="space-y-4 w-[320px]">
                <Input
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Button
                    onClick={onSubmit}
                    className="w-full bg-black text-white py-2"
                >
                    Send magic link
                </Button>
            </div>
        </div>
    );
}
