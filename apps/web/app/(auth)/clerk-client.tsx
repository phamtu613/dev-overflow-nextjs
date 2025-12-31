// apps/web/components/auth/clerk-client.tsx
'use client';

import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

export function ClerkClient({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ClerkLoading />
            <ClerkLoaded>{children}</ClerkLoaded>
        </>
    );
}
