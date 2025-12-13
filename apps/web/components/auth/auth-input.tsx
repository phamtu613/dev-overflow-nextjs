"use client";

import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { cn } from "@repo/utils/cn";
import * as React from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-3.5">
        <Label
          htmlFor={inputId}
          className="text-base font-medium text-dark-400"
        >
          {label}
        </Label>
        <Input
          id={inputId}
          ref={ref}
          className={cn(
            "h-12 px-6 py-4 rounded-md bg-light-900 border-light-700 text-dark-400 placeholder:text-light-400 focus-visible:ring-primary focus-visible:border-primary",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";
