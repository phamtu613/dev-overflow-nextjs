"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { useState, useCallback, type FormEvent, type ChangeEvent } from "react";

interface SignInFormProps {
    onSubmit: (email: string) => Promise<void>;
}

export function SignInForm({ onSubmit }: SignInFormProps) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        // Clear error when user starts typing
        if (error) setError("");
    }, [error]);

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (loading || !email.trim()) return;

            setLoading(true);
            setError("");

            try {
                await onSubmit(email.trim());
            } catch (err) {
                const errorMessage = err instanceof Error
                    ? err.message
                    : "Failed to send email. Please try again.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [email, loading, onSubmit]
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label
                    htmlFor="email"
                    className="text-gray-800 text-sm font-medium"
                >
                    Email address
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    disabled={loading}
                    autoComplete="email"
                    placeholder="name@example.com"
                    className="
                        w-full px-4 py-3 
                        bg-white
                        rounded-xl
                        text-gray-900
                        placeholder:text-gray-400
                        border border-gray-200
                        caret-[#FF7000]
                        focus:border-orange-400
                        focus-visible:ring-2
                        focus-visible:ring-orange-500
                        transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                    "
                />
            </div>

            {error && (
                <p className="text-red-500 text-center text-sm" role="alert">
                    {error}
                </p>
            )}

            <Button
                type="submit"
                disabled={loading || !email.trim()}
                className="
                    w-full py-3 rounded-xl font-semibold shadow-lg text-white 
                    transition-opacity text-[15px]
                    bg-[linear-gradient(90deg,#FF7000,#E2985E,#E2995F)] 
                    hover:opacity-90 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white
                "
            >
                {loading ? "SENDING..." : "CONTINUE"}
            </Button>
        </form>
    );
}
