"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
    title: string;
    subtitle: string;
    footerText: string;
    footerLinkText: string;
    footerHref: string;
    children: ReactNode;
}

export function AuthLayout({
    title,
    subtitle,
    footerText,
    footerLinkText,
    footerHref,
    children,
}: Props) {
    return (
        <div className="
      min-h-screen w-full
      flex items-center justify-center
      relative
      py-10
    ">
            {/* Background blur */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="h-96 w-96 bg-orange-500 rounded-full blur-[150px] absolute top-10 left-20" />
                <div className="h-96 w-96 bg-blue-500 rounded-full blur-[160px] absolute bottom-10 right-20" />
            </div>

            <div className="relative w-full flex justify-center">
                {/* Clerk badge */}
                <div className="absolute left-0 top-28 -translate-x-full -translate-y-1/2">
                    <div className="
            clerk-ribbon
            flex items-center gap-1
            text-xs
            opacity-80
            bg-orange-500
            text-white
            px-3 py-2
            rounded-r-md
            shadow-lg
          ">
                        <span>Secured by</span>
                        <Image
                            src="/clerk.svg"
                            width={14}
                            height={14}
                            className="invert"
                            alt="Clerk"
                        />
                        <span>Clerk</span>
                    </div>
                </div>

                {/* Card */}
                <div className="
          relative w-full max-w-md
          bg-[#0f1117]/95
          backdrop-blur-xl
          rounded-2xl
          shadow-2xl
          border border-white/10
          px-8 py-10
          space-y-8

          max-h-[85vh]
          overflow-y-auto
        ">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-6 text-white">
                        <Image
                            src="/logo.svg"
                            width={38}
                            height={38}
                            alt="DevOverflow"
                        />
                        <p className="text-[24px] font-medium">
                            Dev
                            <strong className="text-orange-400">Overflow</strong>
                        </p>
                    </div>

                    {/* Header */}
                    <header className="space-y-1">
                        <h1 className="text-xl font-semibold text-white">
                            {title}
                        </h1>
                        <p className="text-sm text-gray-400">
                            {subtitle}
                        </p>
                    </header>

                    {/* FORM */}
                    {children}

                    {/* Footer */}
                    <footer className="flex justify-between text-sm text-gray-400 pt-4">
                        <p>
                            {footerText}{" "}
                            <Link
                                href={footerHref}
                                className="text-orange-400 hover:text-orange-300"
                            >
                                {footerLinkText}
                            </Link>
                        </p>

                        <nav className="flex gap-3">
                            <button className="hover:text-white">Help</button>
                            <button className="hover:text-white">Privacy</button>
                            <button className="hover:text-white">Terms</button>
                        </nav>
                    </footer>
                </div>
            </div>
        </div>
    );
}
