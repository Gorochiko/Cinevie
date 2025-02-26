"use client";
import { signIn } from "next-auth/react";
import { APIError, fetchData, postData } from "@/services/api";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { Underline } from "lucide-react";
import { Session } from "inspector";

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
  userId?: string,
}


interface flimRes {
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
  return result.error ? { error: result.error } : result;
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


export const verify = async (verificationCode:string, email:string) => {
  const result = await postData<response>("/auth/verify", {verificationCode:verificationCode, email:email}, undefined);
  return result.error ? { error: result.error } : result?.message;
}



