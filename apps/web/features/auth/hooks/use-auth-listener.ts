"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function useAuthListener() {
    const { signOut } = useClerk();
    const router = useRouter();

    useEffect(() => {
        const handler = async () => {
            await signOut();
            router.replace("/login");
        };

        window.addEventListener("auth:unauthorized", handler);
        return () =>
            window.removeEventListener("auth:unauthorized", handler);
    }, [signOut, router]);
}
