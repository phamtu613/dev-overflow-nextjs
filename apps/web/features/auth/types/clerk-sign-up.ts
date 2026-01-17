import type { useSignUp } from "@clerk/nextjs";

export type ClerkSignUp = NonNullable<ReturnType<typeof useSignUp>["signUp"]>;
