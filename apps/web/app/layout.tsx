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
      <body className="min-h-screen bg-black bg-[url('/bg-dark.png')] z-10 bg-cover bg-no-repeat">
        <ClerkProvider>
          <ClerkAxiosBridge />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
