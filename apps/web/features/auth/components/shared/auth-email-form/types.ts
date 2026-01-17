// types.ts
import type { UseFormReturn } from "react-hook-form";
import type {
    SignInValues,
    SignUpValues,
} from "@/features/auth/schemas/auth";

export type AuthFormValues = SignInValues | SignUpValues;

export interface AuthEmailFormViewProps {
    form: UseFormReturn<AuthFormValues>;
    onSubmit: (values: AuthFormValues) => Promise<void>;
    isLoading: boolean;
    title: string;
    submitText: string;
    showPassword: boolean;
}

export interface SubmitButtonProps {
    loading: boolean;
    text: string;
}
