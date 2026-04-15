
import type { ReactNode } from "react";

export default function AuthLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <>
            {children}
            <div id="clerk-captcha" className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2" />
        </>
    );
}
