import { signIn } from "next-auth/react";
import {  APIError, fetchData, patchData, postData } from "../services/api";



/**
 * The mask of user type
 */
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
/**
 * 
 * @param username 
 * @param password 
 * Step1: Call signIn from next-auth
 * Step2: Check if response has error, return error code
 * Step3: Return success
 * @returns 
 */
export async function login(username: string, password: string) {
  const response = await signIn("credentials", {
    redirect: false,
    username,
    password,
  });
  return response?.error ? { error: response?.code } : { success: true };
}

/**
 * 
 * @param user 
 * Step1: Call postData to register user
 * Step2: Check if response has error, return error code
 * Step3: Return success
 * @returns 
 */
export const register = async (user: usertype) => {
  const result = await postData<response>("/auth/signUp", user, undefined);
  return result.error ? { error: result.error } : result;
}



/**
 * 
 * @param verificationCode 
 * @param email 
 * Step1: Call postData to verify user
 * Step2: Check if response has error, return error code
 * Step3: Return success
 * @returns 
 */
export const verify = async (verificationCode:string, email:string) => {
  const result = await postData<response>("/auth/verify", {verificationCode:verificationCode, email:email}, undefined);
  return result.error ? { error: result.error } : result?.message;
}