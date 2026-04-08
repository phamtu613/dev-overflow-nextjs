import type { SignInInput } from "../schemas/sign-in.schema";
import type { SignUpInput } from "../schemas/sign-up.schema";
import type { ClerkSignIn } from "../types/clerk-sign-in";
import type { ClerkSignUp } from "../types/clerk-sign-up";

export async function signInWithEmail(
    signIn: ClerkSignIn,
    data: SignInInput
) {
    console.log("[AuthService] signInWithEmail:start", {
        email: data.email,
        hasPassword: Boolean(data.password),
    });

    const result = await signIn.create({
        identifier: data.email,
        password: data.password,
    });

    console.log("[AuthService] signInWithEmail:success", {
        status: result.status,
        createdSessionId: result.createdSessionId ?? null,
    });

    return result;
}

export async function signUpWithEmail(
    signUp: ClerkSignUp,
    data: SignUpInput
): Promise<ClerkSignUp> {
    // Create the user
    await signUp.create({
        emailAddress: data.email,
        password: data.password,
    });

    // Send verification email
    await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
    });

    return signUp;
}
