import type { ReactNode } from "react";
import "./globals.css";
import { ClerkAxiosBridge } from "./infrastructure/auth/clerk-axios-bridge";


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <html lang="en">
        <body>
          <ClerkAxiosBridge />
          {children}
        </body>
      </html>
    </div>
  );
}
