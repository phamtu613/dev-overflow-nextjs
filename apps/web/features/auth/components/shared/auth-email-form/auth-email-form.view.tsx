// auth-email-form.view.tsx
import { Form } from "@repo/ui/form";
import { EmailField } from "./fields/email-field";
import { PasswordField } from "./fields/password-field";
import type { AuthEmailFormViewProps } from "./types";
import { SubmitButton } from "../submit-button";

export function AuthEmailFormView({
    form,
    isLoading,
    title,
    submitText,
    showPassword,
    onSubmit,
}: AuthEmailFormViewProps) {
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <EmailField
                    control={form.control}
                    disabled={isLoading}
                    label={title}
                />

                {showPassword && (
                    <PasswordField
                        control={form.control}
                        disabled={isLoading}
                    />
                )}

                <SubmitButton
                    loading={isLoading}
                    text={submitText}
                />
            </form>
        </Form>
    );
}
