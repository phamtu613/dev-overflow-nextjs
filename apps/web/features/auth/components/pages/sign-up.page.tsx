import { AuthForm } from "../shared/auth-email-form/auth-form";
import { AuthLayout } from "../shared/auth-layout";

export default function SignUpPage() {
    return (
        <AuthLayout
            title="Create account"
            subtitle="Join DevOverflow to ask & share knowledge"
            footerText="Already have an account?"
            footerLinkText="Sign in"
            footerHref="/sign-in"
        >
            <AuthForm mode="signup" />
        </AuthLayout>
    );
}
