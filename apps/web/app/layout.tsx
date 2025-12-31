import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";
import "./globals.css";

// Force dynamic rendering since ClerkProvider requires publishableKey at runtime
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <html lang="en">
        <body>
          <ClerkProvider>
            {children}
          </ClerkProvider>
        </body>
      </html>
    </div>
  );
}
