"use client";
import { signIn } from "next-auth/react";
import { APIError, fetchData, postData } from "@/services/api";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { Underline } from "lucide-react";

interface usertype {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  rePassword: string,
}
interface response {
  message: string,
  error?: { message: string },
}


interface flimRes {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  results: any[];

}


export async function login(username: string, password: string) {
  const response = await signIn("credentials", {
    redirect: false,
    username,
    password,
  });
  return response?.error ? { error: response?.code } : { success: true };
}


export const register = async (user: usertype) => {
  const result = await postData<response>("/auth/signUp", user, undefined);
  return result.error ? { error: result.error } : { success: true };
}

export const getFilms = async () => {
  try {
   const results = await fetchData<flimRes>("/films/getFilms", {})
   return results
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim:", error);
    throw error;
  }
};

export const createFilms = async (films:FormData) => {
  try {
    const response = await postData("/films/add-films", films,true);

    if (!response) {
      throw new APIError("Lỗi khi thêm phim");
    }

    return response;
  } catch (error) {
    console.error("Lỗi khi thêm phim:", error);
    throw error;
  }
};



