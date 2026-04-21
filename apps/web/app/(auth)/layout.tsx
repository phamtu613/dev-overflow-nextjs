
import type { ReactNode } from "react";

export default function AuthLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-black bg-[url('/bg-dark.png')] bg-cover bg-no-repeat">
            {children}
            <div id="clerk-captcha" className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2" />
        </div>
    );
}
