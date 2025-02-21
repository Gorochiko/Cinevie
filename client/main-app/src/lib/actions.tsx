"use client";
import { signIn } from "next-auth/react";

export  async function login(username: string, password: string) {
  const response = await signIn("credentials", {
    redirect: false,
    username,
    password,
  });

  return response?.error ? { error: response?.code } : { success: true };
}