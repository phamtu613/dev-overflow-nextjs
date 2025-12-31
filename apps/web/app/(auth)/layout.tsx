
import type { ReactNode } from "react";

// Force dynamic rendering for auth pages since they depend on Clerk
export const dynamic = "force-dynamic";

export default function AuthLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="w-full max-w-md rounded-lg shadow-sm">
                {children}
            </div>
        </div>
    );
}
