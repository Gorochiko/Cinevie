"use client";
import { signIn } from "next-auth/react";
import { postData } from "@/services/api";
import { error } from "console";
interface usertype{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    rePassword:string,
}
 interface response{
  message:string,
  error?: {message:string},
 }
export  async function login(username: string, password: string) {
  const response = await signIn("credentials", {
    redirect: false,
    username,
    password,
  });

  return response?.error ? { error: response?.code } : { success: true };
}

export const register = async (user: usertype)=>{
  const result = await postData<response>("/auth/signUp",user,undefined);
  return result.error ? {error:result.message}: {success:true};
  }
  


