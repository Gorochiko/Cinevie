// Code by: Truong Vu
import { signIn } from "next-auth/react";
import { APIError, fetchData, patchData, postData } from "@/services/api";

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

/**
 * The mask of response
 */
interface response {
  message: string,
  error?: { message: string },
  userId?: string,
}

interface theater {
  name: string,
  address: string,
}


/**
 * The mask of film response
 */
interface flimRes {
  results: any[];
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
 * Step1: Call fetchData to get films
 * Step2: Check if response has error, return error code
 * Step3: Return success
 * @returns results
 */
export const getFilms = async () => {
  try {
   const results = await fetchData<flimRes>("/films/getFilms", {})
   return results
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phim:", error);
    throw error;
  }
};






/** 
 * @param films 
 * Step1: Call postData to create films
 * Step2: Check if response has error, return error code
 * Step3: Return success
 * @returns 
 */
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








/**
 * @param id 
 * @param films
 * Step1: Call patchData to update films
 * Step2: Check if response has error, return error code
 * Step3: Return success 
 * @returns 
 */
export const updateFilmsAPI = async (id:string,films:any) => {
  try {
    const response = await patchData(`/films/update-films/${id}`, films,true);
    if (!response) {
      throw new APIError("Lỗi khi cập nhật phim");
    }
    return response;
  } catch (error) {
    console.error("Lỗi khi cập nhật phim:", error);
    throw error;
  }
}




export const createTheater = async (theater:theater) => {
  try {
    const response = await postData("/theaters/add-theaters", theater,true);
    if (!response) {
      throw new APIError("Lỗi khi thêm rạp");
    }
    return response;
  } catch (error) {
    console.error("Lỗi khi thêm rạp:", error);
    throw error;
  }
}






export const getTheaters = async () => {
  try {
   const results = await fetchData("/theaters/findtheater", {})
   return results
  } catch (error) {
    console.error("Lỗi khi lấy danh sách rạp:", error);
    throw error;
  }
};






export const createRoomToTheater = async (room:any, threaterId:string) => {
  try {
    const response = await postData<response>(`/theaters/add-room/${threaterId}`,room,true);
    if (!response) {
      throw new APIError("Lỗi khi thêm phòng");
    }
    return response;
  } catch (error) {
    console.error("Lỗi khi thêm phòng:", error);
    throw error;
  }

}

