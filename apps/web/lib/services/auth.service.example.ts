/**
 * Auth Service
 * Handles all authentication-related API calls
 *
 * Setup:
 * 1. Rename file này thành `auth.service.ts`
 * 2. Ensure api-client.ts đã được tạo
 * 3. Import và sử dụng trong components
 */

import type { LoginInput, RegisterInput } from "@repo/schemas/auth";
import { apiClient } from "../api-client";

/**
 * Response types từ NestJS backend
 * Adjust theo actual backend response structure
 */
export interface LoginResponse {
  access_token: string;
  refresh_token?: string;
  user: {
    id: string;
    email: string;
    username: string;
    avatar?: string;
  };
}

export interface RegisterResponse {
  message: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Auth Service
 */
export const authService = {
  /**
   * Login
   * POST /api/auth/login
   */
  login: async (data: LoginInput): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      "/api/auth/login",
      data
    );

    // Save tokens to localStorage
    localStorage.setItem("access_token", response.data.access_token);
    if (response.data.refresh_token) {
      localStorage.setItem("refresh_token", response.data.refresh_token);
    }

    return response.data;
  },

  /**
   * Register
   * POST /api/auth/register
   */
  register: async (data: RegisterInput): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      "/api/auth/register",
      data
    );
    return response.data;
  },

  /**
   * Logout
   * POST /api/auth/logout
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/api/auth/logout");
    } finally {
      // Clear tokens regardless of API call success
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  },

  /**
   * Get current user
   * GET /api/auth/me
   */
  getCurrentUser: async (): Promise<UserResponse> => {
    const response = await apiClient.get<UserResponse>("/api/auth/me");
    return response.data;
  },

  /**
   * Refresh token
   * POST /api/auth/refresh
   */
  refreshToken: async (): Promise<{ access_token: string }> => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await apiClient.post<{ access_token: string }>(
      "/api/auth/refresh",
      { refresh_token: refreshToken }
    );

    // Update access token
    localStorage.setItem("access_token", response.data.access_token);

    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("access_token");
  },

  /**
   * Get stored token
   */
  getToken: (): string | null => {
    return localStorage.getItem("access_token");
  },
};

/**
 * Example Usage trong component:
 *
 * import { authService } from "@/lib/services/auth.service";
 * import { useAuthStore } from "@repo/store/auth-store";
 *
 * const MyComponent = () => {
 *   const { login } = useAuthStore();
 *
 *   const handleLogin = async (data: LoginInput) => {
 *     try {
 *       const result = await authService.login(data);
 *
 *       // Save user to Zustand store
 *       login(result.user);
 *
 *       // Redirect
 *       router.push("/dashboard");
 *     } catch (error) {
 *       console.error("Login failed:", error);
 *     }
 *   };
 * };
 */
