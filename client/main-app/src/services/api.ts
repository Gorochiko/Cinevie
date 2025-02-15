
import axios from 'axios';
import { AxiosResponse } from 'axios';

const API = axios.create({
  baseURL:process.env.BACKEND_DOMAIN || 'http://localhost:8080'
});


interface ApiResponse<T> {
  data: T;
  message?: string;
}

// Hàm gọi API GET
type FetchDataResponse = Record<string, any>[];
export const fetchData = async (endpoint: string): Promise<FetchDataResponse> => {
  try {
    const response: AxiosResponse<ApiResponse<FetchDataResponse>> = await API.get(endpoint);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    throw error;
  }
};

// Hàm gọi API POST
type PostDataResponse = Record<string, any>;
export const postData = async (endpoint: string, data: Record<string, any>): Promise<PostDataResponse> => {
  try {
    const response: AxiosResponse<ApiResponse<PostDataResponse>> = await API.post(endpoint, data);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi gửi dữ liệu:', error);
    throw error;
  }
};

