"use client";

import { useState } from "react";

interface Props {
    onSubmit(email: string): Promise<void>;
}

export function SignInForm({ onSubmit }: Props) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError("");

        try {
            await onSubmit(email);
        } catch (err: any) {
            setError(err?.message || "Failed to send email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            {error && <p className="text-red-400">{error}</p>}

            <button disabled={loading}>
                {loading ? "Sending…" : "Continue"}
            </button>
        </form>
    );
}
