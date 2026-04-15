import type { SignUpInput } from "../schemas/sign-up.schema";
import type { ClerkSignUp } from "../types/clerk-sign-up";

export async function signUpWithEmail(
    signUp: ClerkSignUp,
    data: SignUpInput
): Promise<ClerkSignUp> {
    const firstName = data.firstName?.trim();
    const lastName = data.lastName?.trim();

    // Create the user
    await signUp.create({
        emailAddress: data.email,
        password: data.password,
        username: data.username.trim(),
        ...(firstName ? { firstName } : {}),
        ...(lastName ? { lastName } : {}),
    });

    // Send verification email
    await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
    });

    return signUp;
}
