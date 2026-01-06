import type { SignInInput } from "../schemas/sign-in.schema";
import type { SignUpInput } from "../schemas/sign-up.schema";
import type { ClerkSignIn } from "../types/clerk-sign-in";
import type { ClerkSignUp } from "../types/clerk-sign-up";

export async function signInWithEmail(
    signIn: ClerkSignIn,
    data: SignInInput
) {
    return signIn.create({
        identifier: data.email,
        password: data.password,
    });
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
