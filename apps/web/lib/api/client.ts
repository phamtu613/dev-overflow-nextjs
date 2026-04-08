// lib/api/client.ts
import axios from "axios";
import { getAuthToken } from "./auth-token";
import { getJwtSegmentCount, logClerkToken } from "./jwt-debug";

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
});

apiClient.interceptors.request.use(async (config) => {
    const token = await getAuthToken();
    console.log("[APIClient] request:start", {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        hasToken: Boolean(token),
    });

    logClerkToken("request:attach", token, {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
    });

    if (token) {
        console.log("token", token);
        console.log("parts", getJwtSegmentCount(token));
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        console.log("[APIClient] response:success", {
            method: response.config.method?.toUpperCase(),
            url: response.config.url,
            baseURL: response.config.baseURL,
            status: response.status,
            data: response.data,
        });

        return response;
    },
    (error) => {
        console.log("[APIClient] response:error", {
            method: error.config?.method?.toUpperCase(),
            url: error.config?.url,
            baseURL: error.config?.baseURL,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
        });

        return Promise.reject(error);
    }
);
