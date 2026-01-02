import type { InternalAxiosRequestConfig } from "axios";
import { apiClient } from "./client";
import { resolveAuthToken } from "./auth-token";

/* ---------------- Request ---------------- */

async function attachAuthHeader(
    config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> {
    const token = await resolveAuthToken();

    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
}

/* ---------------- Response ---------------- */

function emitUnauthorized() {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("auth:unauthorized"));
    }
}

/* ---------------- Register ---------------- */

export function setupApiInterceptors() {
    apiClient.interceptors.request.use(
        (config) => attachAuthHeader(config),
        (error) => Promise.reject(error),
    );

    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                emitUnauthorized();
            }
            return Promise.reject(error);
        },
    );
}
