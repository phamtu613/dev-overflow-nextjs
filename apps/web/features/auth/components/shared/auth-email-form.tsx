"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import {
    useState,
    useCallback,
    type FormEvent,
    type ChangeEvent,
} from "react";

interface AuthEmailFormProps {
    title?: string;
    submitText?: string;
    onSubmit: (email: string, password?: string) => Promise<void>;

    /* signup only */
    showPassword?: boolean;
}

export function AuthEmailForm({
    onSubmit,
    title = "Email address",
    submitText = "CONTINUE",
    showPassword = false,
}: AuthEmailFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleEmailChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            if (error) setError("");
        },
        [error]
    );

    const handlePasswordChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
            if (error) setError("");
        },
        [error]
    );

    const handleSubmit = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (loading || !email.trim()) return;
            if (showPassword && !password.trim()) {
                setError("Password is required");
                return;
            }

            setLoading(true);
            setError("");

            try {
                await onSubmit(email.trim(), password);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed. Please try again."
                );
            } finally {
                setLoading(false);
            }
        },
        [email, password, loading, onSubmit, showPassword]
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div className="space-y-2">
                <Label
                    htmlFor="email"
                    className="text-gray-300 text-sm font-medium"
                >
                    {title}
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
                    className="w-full px-4 py-3 bg-[#151821] rounded-xl text-white placeholder:text-gray-600 border border-transparent focus:border-[#FF7000]"
                />
            </div>

            {/* PASSWORD (signup only) */}
            {showPassword && (
                <div className="space-y-2">
                    <Label
                        htmlFor="password"
                        className="text-gray-300 text-sm font-medium"
                    >
                        Password
                    </Label>

                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        disabled={loading}
                        autoComplete="new-password"
                        placeholder="Enter password"
                        className="w-full px-4 py-3 bg-[#151821] rounded-xl text-white placeholder:text-gray-600 border border-transparent focus:border-[#FF7000]"
                    />
                </div>
            )}

            {error && (
                <p className="text-red-400 text-center text-sm" role="alert">
                    {error}
                </p>
            )}

            <Button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-3 rounded-xl font-semibold text-white bg-orange-500 hover:opacity-90 disabled:opacity-50"
            >
                {loading ? "PROCESSING..." : submitText}
            </Button>
        </form>
    );
}
