"use client";

import { Eye, EyeOff } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import type { SignUpInput } from "@/features/auth/schemas/sign-up.schema";

interface SignUpFormProps {
    form: UseFormReturn<SignUpInput>;
    onSubmit: (values: SignUpInput) => Promise<void>;
    isSubmitting: boolean;
    error: string | null;
}

const baseInputClassName =
    "h-11 rounded-lg border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-orange-500";

interface FieldProps {
    id: keyof SignUpInput;
    label: string;
    optional?: boolean;
    type?: "text" | "email" | "password";
    autoComplete?: string;
    form: UseFormReturn<SignUpInput>;
    disabled: boolean;
}

function FormField({
    id,
    label,
    optional = false,
    type = "text",
    autoComplete,
    form,
    disabled,
}: FieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const error = form.formState.errors[id]?.message;

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
                <Label htmlFor={id} className="font-medium text-gray-800">
                    {label}
                </Label>
                {optional && <span className="text-gray-500">Optional</span>}
            </div>
            <div className="relative">
                <Input
                    id={id}
                    type={isPassword && showPassword ? "text" : type}
                    autoComplete={autoComplete}
                    disabled={disabled}
                    {...form.register(id)}
                    className={`${baseInputClassName} ${isPassword ? "pr-10" : ""}`}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                )}
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

export function SignUpForm({ form, onSubmit, isSubmitting, error }: SignUpFormProps) {
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                <FormField
                    id="firstName"
                    label="First name"
                    optional
                    autoComplete="given-name"
                    form={form}
                    disabled={isSubmitting}
                />
                <FormField
                    id="lastName"
                    label="Last name"
                    optional
                    autoComplete="family-name"
                    form={form}
                    disabled={isSubmitting}
                />
            </div>

            <FormField
                id="username"
                label="Username"
                autoComplete="username"
                form={form}
                disabled={isSubmitting}
            />
            <FormField
                id="email"
                label="Email address"
                type="email"
                autoComplete="email"
                form={form}
                disabled={isSubmitting}
            />
            <FormField
                id="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                form={form}
                disabled={isSubmitting}
            />

            {error && (
                <p className="text-center text-sm text-red-500" role="alert">
                    {error}
                </p>
            )}

            <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full rounded-lg bg-[linear-gradient(90deg,#ff6a00_0%,#ea9b57_100%)] text-xs font-semibold tracking-wide text-white hover:opacity-90"
            >
                {isSubmitting ? "CREATING ACCOUNT..." : "CONTINUE"}
            </Button>
        </form>
    );
}
