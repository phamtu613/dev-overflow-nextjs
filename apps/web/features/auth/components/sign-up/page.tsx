"use client";

import Link from "next/link";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";

import { useSignUpForm } from "../../hooks/use-sign-up-form";

export default function SignUpPage() {
    const { form, onSubmit, error, isSubmitting } = useSignUpForm();

    return (
        <div className="space-y-6 text-white">
            <header className="text-center">
                <h1 className="text-xl font-semibold">Create account</h1>
                <p className="text-sm text-muted-foreground">
                    Join DevOverflow to ask &amp; share knowledge
                </p>
            </header>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                        Email address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                        disabled={isSubmitting}
                        {...form.register("email")}
                        className="w-full rounded-md border bg-background px-3 py-2"
                    />
                    {form.formState.errors.email && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        disabled={isSubmitting}
                        {...form.register("password")}
                        className="w-full rounded-md border bg-background px-3 py-2"
                    />
                    {form.formState.errors.password && (
                        <p className="text-sm text-destructive">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>

                {error && (
                    <p className="text-sm text-destructive text-center" role="alert">
                        {error}
                    </p>
                )}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-orange-500 py-2 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
                >
                    {isSubmitting ? "Creating account..." : "Sign up"}
                </Button>
            </form>

            <footer className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-orange-500 hover:underline">
                    Sign in
                </Link>
            </footer>
        </div>
    );
}
