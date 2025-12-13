"use client";

import { cn } from "@repo/utils/cn";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[520px] rounded-[10px] bg-light-800 p-8 shadow-[0px_29px_59px_rgba(0,0,0,0.16)]",
        className
      )}
    >
      {children}
    </div>
  );
}

interface AuthHeaderProps {
  title: string;
  subtitle: string;
  showLogo?: boolean;
}

export function AuthHeader({
  title,
  subtitle,
  showLogo = true,
}: AuthHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-dark-100">{title}</h1>
        <p className="text-base text-dark-500">{subtitle}</p>
      </div>
      {showLogo && (
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="DevOverflow Logo"
            width={50}
            height={50}
            className="object-contain"
          />
        </Link>
      )}
    </div>
  );
}

interface AuthFooterLinkProps {
  text: string;
  linkText: string;
  href: string;
}

export function AuthFooterLink({ text, linkText, href }: AuthFooterLinkProps) {
  return (
    <p className="text-center text-sm text-dark-400">
      {text}{" "}
      <Link href={href} className="text-primary font-medium hover:underline">
        {linkText}
      </Link>
    </p>
  );
}

interface BackToLoginProps {
  className?: string;
}

export function BackToLogin({ className }: BackToLoginProps) {
  return (
    <Link
      href="/sign-in"
      className={cn(
        "flex items-center justify-center gap-1 text-sm text-dark-400 hover:text-dark-500 transition-colors cursor-pointer",
        className
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="rotate-225"
      >
        <path
          d="M5.83337 14.1667L14.1667 5.83337M14.1667 5.83337H5.83337M14.1667 5.83337V14.1667"
          stroke="currentColor"
          strokeWidth="1.67"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Back to login</span>
    </Link>
  );
}
