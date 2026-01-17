import { getAuthToken } from "./auth-token";
import { apiClient } from "./client";

apiClient.interceptors.request.use(async (config) => {
    console.log("[API] request:", config.url);

    const token = await getAuthToken();
    console.log("[API] token attached:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
