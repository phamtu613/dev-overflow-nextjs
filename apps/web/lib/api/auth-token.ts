// lib/api/auth-token.ts
let tokenGetter: (() => Promise<string | null>) | null = null;

export function registerAuthTokenGetter(fn: () => Promise<string | null>) {
  tokenGetter = fn;
}

export async function getAuthToken() {
  if (!tokenGetter) {
    console.warn("No token getter registered");
    return null;
  }

  return tokenGetter(); // ✅ PHẢI là dòng này
}