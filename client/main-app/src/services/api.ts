import axios from 'axios';
import { AxiosError, AxiosResponse, AxiosInstance } from 'axios';
import { getSession, signOut } from 'next-auth/react';
import { auth } from "@/lib/auth";

export class APIError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
        public response?: unknown
    ) {
        super(message);
        this.name = 'APIError';
    }
}


// Define public routes configuration without /api prefix
const PUBLIC_ROUTES = [
    '/auth/signin',
    '/auth/re-verify',
    '/user',
    '/auth/verify',
    '/auth/signUp',
    '/auth/signout',
] as const;

// Helper to check if route is public
const isPublicRoute = (url: string): boolean => {

    const normalizedUrl = url.replace(/^\/api/, '');
    return PUBLIC_ROUTES.some(route => {
        // Handle wildcard routes (e.g., /public/*)
        if (route.endsWith('*')) {
            const baseRoute = route.slice(0, -1);
            return normalizedUrl.startsWith(baseRoute);
        }
        return normalizedUrl === route;
    });
};

// Helper to get session based on environment

export const API: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});


const getAuthSession = async () => {
    try {
        if (typeof window !== 'undefined') {
            return await getSession();
        }
        return await auth();
    } catch (error) {
        console.error('Session fetch error:', error);
        return null;
    }
};

API.interceptors.request.use(
    async (config) => {
        // Skip auth for public routes
        if (isPublicRoute(config.url || '')) {
            return config;
        }
        if (config.headers?.Authorization) {
            return config;
        }
        const session = await getAuthSession();
        if (!session || !session.user || !session?.user.access_token) {
            throw new APIError('No authentication token found', 401);

        }
        else
            config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${session.user.access_token}`;
        return config;
    },
    (error) => Promise.reject(new APIError(error.message))
);


API.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
        const message = error.response?.data?.message || error.message;
        const statusCode = error.response?.status;

        if (statusCode == 401) {
            if (typeof window !== "undefined") {
                signOut({ redirect: true, callbackUrl: "/login" });
            }
        }
        throw new APIError(message, statusCode, error.response?.data);
    }
);


interface ApiResponse<T> {
    data: T;
    message?: string;
}

export const fetchData = async <T>(endpoint: string, config: { headers: { Authorization: string; }; }): Promise<T> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await API.get(endpoint, config);
        return response.data as T;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Lỗi khi lấy dữ liệu:', error.response.data.message);
        }
        throw error;
    }
};

// Hàm gọi API POST
export const postData = async <T>(endpoint: string, data: Record<string, any>, requireAuth = true): Promise<T> => {
    try {
        const config = requireAuth ? {} : { headers: { Authorization: '' } };
        const response: AxiosResponse<ApiResponse<T>> = await API.post(endpoint, data, config);
        return response.data as T;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Lỗi khi gửi dữ liệu:', error.response.data.message);
        }
        throw error;
    }
};