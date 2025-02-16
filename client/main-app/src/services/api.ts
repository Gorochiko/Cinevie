
import axios from 'axios';
import { AxiosResponse, AxiosInstance } from 'axios';

export  const API: AxiosInstance = axios.create({
    baseURL:process.env.NEXT_PUBLIC_BACKEND_DOMAIN||'http://localhost:8080/api',
    headers:{
        'Content-Type':'aplication/json',
    },
    timeout:5000,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;  
    return config;
  });

API.interceptors.response.use(
    response => response,
    error => {
   
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);
interface ApiResponse<T> {
    data: T;
    message?: string;
}

// Hàm gọi API GET
export const fetchData = async <T>(endpoint: string): Promise<T> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await API.get(endpoint);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
};

// Hàm gọi API POST
export const postData = async <T>(endpoint: string, data: Record<string, any>): Promise<T> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await API.post(endpoint, data);
        return response.data.data;
    } catch (error) {
        console.error('Lỗi khi gửi dữ liệu:', error);
        throw error;
    }
};




