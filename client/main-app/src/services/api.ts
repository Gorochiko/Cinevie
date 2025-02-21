import axios from 'axios';
import { AxiosResponse, AxiosInstance } from 'axios';


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
export const API: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_DOMAIN || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 5000,
});



// API.interceptors.request.use(
//     (config) => {
//       return getSession().then((session) => {
//         if (session?.user?.exp && session.user.exp * 1000 < Date.now()) {
//           console.log("Token expired, logging out...");
//           signOut();
//           return Promise.reject(new Error("Token expired"));
//         }
  
//         if (session?.user?.access_token) {
//           config.headers.Authorization = `Bearer ${session.user.access_token}`;
//         }
        
//         return config;
//       });
//     },
//     (error) => Promise.reject(error)
//   );





API.interceptors.response.use(
    response => response,
    error => {
        if (axios.isAxiosError(error) && error.response) {
            const errorMessage = error.response.data.message || 'Có lỗi xảy ra';
            return Promise.reject(new Error(errorMessage));
        }
        return Promise.reject(error);
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