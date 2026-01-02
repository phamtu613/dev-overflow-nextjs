export type TokenGetter = () => Promise<string | null>;

let getAuthToken: TokenGetter | null = null;

/**
 * Register auth token getter (call ONCE)
 * Ví dụ: Clerk getToken
 */
export function registerAuthTokenGetter(getter: TokenGetter) {
    getAuthToken = getter;
}

/**
 * Lấy access token hiện tại
 */
export async function resolveAuthToken(): Promise<string | null> {
    if (!getAuthToken) return null;
    return getAuthToken();
}
