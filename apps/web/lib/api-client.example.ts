/**
 * API Client for NestJS Backend
 *
 * Setup:
 * 1. Rename file này thành `api-client.ts`
 * 2. Cài Axios: pnpm --filter web add axios
 * 3. Tạo .env.local: NEXT_PUBLIC_API_URL=http://localhost:4000
 * 4. Import và sử dụng trong components
 */

import axios, { AxiosError } from "axios";

// Base URL từ environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * Axios instance với default config
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

/**
 * Request Interceptor
 * Tự động thêm auth token vào mọi request
 */
apiClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handle errors globally
 */
apiClient.interceptors.response.use(
  (response) => {
    // Success response
    return response;
  },
  (error: AxiosError) => {
    // Error response
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;

      switch (status) {
        case 401:
          // Unauthorized - Token expired hoặc invalid
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");

          // Redirect to login (nếu không phải đang ở login page)
          if (
            typeof window !== "undefined" &&
            !window.location.pathname.includes("/login")
          ) {
            window.location.href = "/login?expired=true";
          }
          break;

        case 403:
          // Forbidden - Không có quyền
          console.error("Access forbidden");
          break;

        case 404:
          // Not found
          console.error("Resource not found");
          break;

        case 500:
          // Server error
          console.error("Server error");
          break;

        default:
          console.error(`API Error: ${status}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network error - No response from server");
    } else {
      // Something else happened
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Type-safe API error handler
 */
export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;

    if (axiosError.response?.data) {
      return axiosError.response.data;
    }

    return {
      message: axiosError.message || "An error occurred",
      statusCode: axiosError.response?.status,
    };
  }

  return {
    message: "An unexpected error occurred",
  };
}

/**
 * Example Usage:
 *
 * import { apiClient, handleApiError } from "@/lib/api-client";
 *
 * try {
 *   const response = await apiClient.post("/api/auth/login", { email, password });
 *   console.log(response.data);
 * } catch (error) {
 *   const apiError = handleApiError(error);
 *   console.error(apiError.message);
 * }
 */
