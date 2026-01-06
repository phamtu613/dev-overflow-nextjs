import type { ReactNode } from "react";
import "./globals.css";
import { ClerkAxiosBridge } from "./infrastructure/auth/clerk-axios-bridge";
import { ClerkProvider } from "@clerk/nextjs";


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider>
      <div className="flex min-h-screen items-center justify-center bg-white">
        <html lang="en">
          <body>
            <ClerkAxiosBridge />
            {children}
          </body>
        </html>
      </div>
    </ClerkProvider>
  );
}
