// lib/api/auth-token.ts
let tokenGetter: (() => Promise<string | null>) | null = null;

export function registerAuthTokenGetter(
    getter: () => Promise<string | null>,
) {
    tokenGetter = getter;
}

export async function getAuthToken() {
    return tokenGetter ? tokenGetter() : null;
}
