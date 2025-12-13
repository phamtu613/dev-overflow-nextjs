"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@repo/utils/cn";

const inputVariants = cva(
  "flex w-full rounded-[10px] border bg-transparent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input shadow-none",
        filled: "border-transparent bg-muted",
        ghost: "border-transparent hover:bg-muted/50",
        error: "border-destructive focus-visible:ring-destructive",
      },
      inputSize: {
        default: "h-10 px-3 py-1 text-base md:text-sm",
        sm: "h-8 px-2 py-1 text-sm",
        lg: "h-12 px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  error?: boolean;
  asChild?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      inputSize,
      leftIcon,
      rightIcon,
      leftElement,
      rightElement,
      error,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "input";
    const finalVariant = error ? "error" : variant;

    // If no icons or elements, render simple input
    if (!leftIcon && !rightIcon && !leftElement && !rightElement) {
      return (
        <Comp
          type={type}
          className={cn(
            inputVariants({ variant: finalVariant, inputSize, className })
          )}
          ref={ref}
          {...props}
        />
      );
    }

    // Size-based spacing
    const iconPositionClass =
      inputSize === "lg" ? "left-4" : inputSize === "sm" ? "left-2" : "left-3";
    const rightIconPositionClass =
      inputSize === "lg"
        ? "right-4"
        : inputSize === "sm"
          ? "right-2"
          : "right-3";
    const leftPaddingClass =
      leftIcon && !leftElement
        ? inputSize === "lg"
          ? "pl-12"
          : inputSize === "sm"
            ? "pl-8"
            : "pl-10"
        : inputSize === "lg"
          ? "pl-4"
          : inputSize === "sm"
            ? "pl-2"
            : "pl-3";
    const rightPaddingClass =
      rightIcon && !rightElement
        ? inputSize === "lg"
          ? "pr-12"
          : inputSize === "sm"
            ? "pr-8"
            : "pr-10"
        : inputSize === "lg"
          ? "pr-4"
          : inputSize === "sm"
            ? "pr-2"
            : "pr-3";

    // With icons/elements, wrap in a container
    return (
      <div
        className={cn(
          "relative flex items-center",
          inputVariants({ variant: finalVariant, inputSize }),
          "p-0", // Reset padding, will be applied to inner elements
          className
        )}
      >
        {leftElement && (
          <div
            className={cn(
              "flex items-center text-muted-foreground",
              inputSize === "lg" ? "pl-4" : inputSize === "sm" ? "pl-2" : "pl-3"
            )}
          >
            {leftElement}
          </div>
        )}
        {leftIcon && !leftElement && (
          <div
            className={cn(
              "pointer-events-none absolute flex items-center text-muted-foreground",
              iconPositionClass
            )}
          >
            {leftIcon}
          </div>
        )}
        <Comp
          type={type}
          className={cn(
            "flex-1 w-full bg-transparent border-0 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground",
            inputSize === "sm"
              ? "h-8 text-sm"
              : inputSize === "lg"
                ? "h-12 text-base"
                : "h-10 text-base md:text-sm",
            leftPaddingClass,
            rightPaddingClass,
            leftElement && "pl-2",
            rightElement && "pr-2"
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && !rightElement && (
          <div
            className={cn(
              "pointer-events-none absolute flex items-center text-muted-foreground",
              rightIconPositionClass
            )}
          >
            {rightIcon}
          </div>
        )}
        {rightElement && (
          <div
            className={cn(
              "flex items-center text-muted-foreground",
              inputSize === "lg" ? "pr-4" : inputSize === "sm" ? "pr-2" : "pr-3"
            )}
          >
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
