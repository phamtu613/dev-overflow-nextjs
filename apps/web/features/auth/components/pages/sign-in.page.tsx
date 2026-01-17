import { AuthForm } from "../shared/auth-email-form/auth-form";
import { AuthLayout } from "../shared/auth-layout";

export default function SignInPage() {
    return (
        <AuthLayout
            title="Sign in"
            subtitle="to continue to DevOverflow"
            footerText="No account?"
            footerLinkText="Sign up"
            footerHref="/sign-up"
        >
            <AuthForm mode="signin" />
        </AuthLayout>
    );
}
