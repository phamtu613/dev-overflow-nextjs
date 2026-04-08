import { getAuthToken } from "./auth-token";
import { apiClient } from "./client";
import { getJwtSegmentCount, logClerkToken } from "./jwt-debug";

apiClient.interceptors.request.use(async (config) => {
    const token = await getAuthToken();
    console.log("token", token);
    console.log("parts", getJwtSegmentCount(token));
    logClerkToken("request:attach:legacy", token, {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
    });

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
