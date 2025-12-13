"use client";

import { Button } from "@repo/ui/button";
import { cn } from "@repo/utils/cn";
import Image from "next/image";

interface SocialButtonProps {
  provider: "google" | "github" | "facebook" | "twitter";
  onClick: () => void;
  showText?: boolean;
  className?: string;
}

const providerConfig = {
  google: {
    icon: "/social/google.svg",
    label: "Login with Google",
    alt: "Google",
  },
  github: {
    icon: "/social/github-mark.svg",
    label: "Login with GitHub",
    alt: "GitHub",
  },
  facebook: {
    icon: "/social/facebook.svg",
    label: "Login with Facebook",
    alt: "Facebook",
  },
  twitter: {
    icon: "/social/twitter.svg",
    label: "Login with Twitter",
    alt: "Twitter",
  },
};

export function SocialButton({
  provider,
  onClick,
  showText = false,
  className,
}: SocialButtonProps) {
  const config = providerConfig[provider];

  if (showText) {
    return (
      <Button
        type="button"
        variant="outline"
        onClick={onClick}
        className={cn(
          "flex-1 flex items-center justify-center gap-2.5 h-12 rounded-lg bg-light-900 border-light-700 text-dark-200 font-medium text-sm hover:bg-light-800 transition-colors cursor-pointer",
          className
        )}
      >
        <Image
          src={config.icon}
          alt={config.alt}
          width={20}
          height={20}
          className="object-contain"
        />
        <span>{config.label}</span>
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center w-[67px] h-[67px] rounded-lg bg-light-800 border border-light-700 hover:bg-light-700 transition-colors cursor-pointer",
        className
      )}
      aria-label={config.label}
    >
      <Image
        src={config.icon}
        alt={config.alt}
        width={24}
        height={24}
        className="object-contain"
      />
    </button>
  );
}

interface SocialButtonsProps {
  onGoogleClick: () => void;
  onGitHubClick?: () => void;
  onFacebookClick?: () => void;
  onTwitterClick?: () => void;
  variant?: "icons" | "buttons";
}

export function SocialButtons({
  onGoogleClick,
  onGitHubClick,
  onFacebookClick,
  onTwitterClick,
  variant = "icons",
}: SocialButtonsProps) {
  if (variant === "buttons") {
    return (
      <div className="flex gap-2.5">
        {onGitHubClick && (
          <SocialButton provider="github" onClick={onGitHubClick} showText />
        )}
        <SocialButton provider="google" onClick={onGoogleClick} showText />
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-4">
      <SocialButton provider="google" onClick={onGoogleClick} />
      {onFacebookClick && (
        <SocialButton provider="facebook" onClick={onFacebookClick} />
      )}
      {onTwitterClick && (
        <SocialButton provider="twitter" onClick={onTwitterClick} />
      )}
    </div>
  );
}
