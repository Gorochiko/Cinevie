"use client";

import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    console.log("Registering with:", { name, email, phone, password });
  };

  return (
    <div className="w-full flex min-h-screen bg-gradient-to-r from-[#1230AE] to-[#C68FE6] p-4 items-center justify-center">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center text-white px-16 space-y-4">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">
          Chào mừng đến với 
          <span className="bg-gradient-to-r from-[#FFD700] to-[#FFFFFF] bg-clip-text text-transparent animate-pulse drop-shadow-glow">Cinevie+</span>
        </h1>
        <p className="text-lg opacity-90 leading-relaxed">
          Đăng ký ngay để trải nghiệm điện ảnh tuyệt vời với những bộ phim hấp dẫn nhất!
        </p>
      </div>
      
      {/* Right Section */}
      <div className="w-1/2 flex justify-center items-center">
        <Card className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 text-gray-900">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Đăng ký</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-3">
                <Label htmlFor="name" className="text-gray-700">Họ và Tên</Label>
                <Input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="bg-white text-gray-900 border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-700">Gmail</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white text-gray-900 border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="phone" className="text-gray-700">Số điện thoại</Label>
                <Input id="phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white text-gray-900 border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-gray-700">Mật khẩu</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-white text-gray-900 border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-gray-700">Xác nhận mật khẩu</Label>
                <Input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-white text-gray-900 border-gray-300 rounded-lg px-4 py-2" />
              </div>
              <div className="flex justify-between items-center text-sm">
                <Link href="login" className="text-blue-600 hover:underline">Đã có tài khoản?</Link>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[#FFD700] to-[#FF8C00] hover:from-[#FFC700] hover:to-[#FF7F00] text-white font-semibold py-3 rounded-lg">
                Đăng ký
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
