"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@repo/utils/cn";

const inputVariants = cva(
  "flex w-full rounded-[6px] border bg-gradient-to-b from-[#141720] to-[#0f1117] text-white transition-all duration-200 \
   file:border-0 file:bg-transparent file:text-sm file:font-medium \
   placeholder:text-gray-500 \
   focus-visible:outline-none \
   focus-visible:ring-2 \
   focus-visible:ring-orange-400/40 \
   focus-visible:border-orange-400/60 \
   disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-white/10",
        filled: "border-transparent bg-white/5",
        ghost: "border-transparent hover:bg-white/5",
        error: "border-red-500 focus-visible:ring-red-500/40",
      },
      inputSize: {
        default: "h-11 px-4 text-sm",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-5 text-base",
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

  /* Label */
  label?: string;

  /* Icons */
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  /* Custom elements */
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;

  /* States */
  error?: boolean;

  /* Polymorphic */
  asChild?: boolean;
}


const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
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
    const inputId = props.id || label;

    if (!leftIcon && !rightIcon && !leftElement && !rightElement) {
      return (
        <>
          {label && (
            <label
              htmlFor={inputId}
              className="mb-1 block text-sm text-gray-400"
            >
              {label}
            </label>
          )}

          <Comp
            id={inputId}
            type={type}
            aria-invalid={finalVariant === "error"}
            className={cn(
              inputVariants({ variant: finalVariant, inputSize, className })
            )}
            ref={ref}
            {...props}
          />
        </>
      );
    }

    return (
      <div
        className={cn(
          "relative flex items-center",
          inputVariants({ variant: finalVariant, inputSize }),
          "p-0",
          className
        )}
      >
        {leftElement && (
          <div className="flex items-center pl-3 text-muted-foreground">
            {leftElement}
          </div>
        )}

        {leftIcon && !leftElement && (
          <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
            {leftIcon}
          </div>
        )}

        <Comp
          id={inputId}
          type={type}
          aria-invalid={finalVariant === "error"}
          className="
            flex-1 bg-transparent border-0
            focus-visible:outline-none
            focus-visible:ring-0
            placeholder:text-muted-foreground
          "
          ref={ref}
          {...props}
        />

        {rightIcon && !rightElement && (
          <div className="pointer-events-none absolute right-3 flex items-center text-muted-foreground">
            {rightIcon}
          </div>
        )}

        {rightElement && (
          <div className="flex items-center pr-3 text-muted-foreground">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, inputVariants };
