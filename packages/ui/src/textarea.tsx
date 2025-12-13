"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@repo/utils/cn";

const textareaVariants = cva(
  "flex w-full rounded-md border bg-transparent transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none",
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted",
        ghost: "border-transparent hover:bg-muted/50",
        error: "border-destructive focus-visible:ring-destructive",
      },
      textareaSize: {
        default: "min-h-[80px] px-3 py-2 text-base md:text-sm",
        sm: "min-h-[60px] px-2 py-1.5 text-sm",
        lg: "min-h-[120px] px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "default",
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  error?: boolean;
  asChild?: boolean;
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant,
      textareaSize,
      error,
      asChild = false,
      autoResize = false,
      onChange,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "textarea";
    const finalVariant = error ? "error" : variant;
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => textareaRef.current!);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (autoResize && textareaRef.current) {
          textareaRef.current.style.height = "auto";
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
        onChange?.(e);
      },
      [autoResize, onChange]
    );

    return (
      <Comp
        className={cn(
          textareaVariants({ variant: finalVariant, textareaSize, className }),
          autoResize && "overflow-hidden"
        )}
        ref={textareaRef}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
