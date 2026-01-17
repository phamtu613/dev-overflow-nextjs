// auth-email-form.container.tsx
"use client";

import { AuthEmailFormView } from "./auth-email-form.view";
import { useAuthEmailForm } from "./hooks/use-auth-email-form";

export function AuthEmailForm(props: any) {
    const { handleSubmit } = useAuthEmailForm(props.onSubmit);

    return (
        <AuthEmailFormView
            {...props}
            onSubmit={handleSubmit}
        />
    );
}
