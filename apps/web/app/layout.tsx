import type { ReactNode } from "react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ClerkAxiosBridge } from "./infrastructure/auth/clerk-axios-bridge";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff5eb_0%,_#fffaf5_28%,_#f4f7fb_100%)] text-slate-900 antialiased">
        <ClerkProvider>
          <ClerkAxiosBridge />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
