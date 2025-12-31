import type { SignInInput } from "../schemas/sign-in.schema";
import type { ClerkSignIn } from "../types/clerk-sign-in";

export async function signInWithEmail(
    signIn: ClerkSignIn,
    data: SignInInput
) {
    return signIn.create({
        identifier: data.email,
        password: data.password,
    });
}
