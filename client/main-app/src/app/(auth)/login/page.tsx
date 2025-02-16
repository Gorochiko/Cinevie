"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Logging in with:", { email, password });
    };

    return (
        <div className="w-full flex min-h-screen bg-gradient-to-r from-[#1230AE] to-[#C68FE6] p-4 items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1)_0%,_rgba(255,255,255,0)_70%)] pointer-events-none animate-fade"></div>
            
            {/* Left Section */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-1/2 flex flex-col justify-center text-white px-16 space-y-4 drop-shadow-lg"
            >
                <h1 className="text-6xl font-extrabold drop-shadow-glow animate-slide-in">
                    Chào mừng đến với 
                    <span 
                        className="bg-gradient-to-r pl-5 from-[#FFD700] to-[#FFFFFF] bg-clip-text text-transparent"
                        style={{ textShadow: "0px 0px 5px rgba(255, 215, 0, 0.8), 0px 0px 10px rgba(255, 215, 0, 0.6), 0px 0px 15px rgba(255, 215, 0, 0.4)" }}
                    >
                        Cinevie+
                    </span>
                </h1>
                <p className="text-lg opacity-90 leading-relaxed animate-fade-in">
                    Nơi trải nghiệm điện ảnh đỉnh cao! Đặt vé nhanh chóng, chọn ghế dễ dàng, tận hưởng những bộ phim hot nhất ngay hôm nay.
                </p>
            </motion.div>
            
            {/* Right Section */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8}}
                className="w-1/2 flex justify-center items-center"
            >
                <Card className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 text-gray-900 border border-gray-300 animate-pop-in">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold drop-shadow-glow">Đăng nhập</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <motion.div className="space-y-3" whileFocus={{ scale: 1.02 }}>
                                <Label htmlFor="email" className="text-gray-700">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-white text-gray-900 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD700] animate-input-focus"
                                />
                            </motion.div>
                            <motion.div className="space-y-3" whileFocus={{ scale: 1.02 }}>
                                <Label htmlFor="password" className="text-gray-700">Mật khẩu</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white text-gray-900 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#FFD700] animate-input-focus"
                                />
                            </motion.div>
                            <div className="flex justify-between items-center text-sm">
                                <a href="#" className="text-blue-600 hover:underline hover:text-black transition-all animate-link-hover">Chưa có tài khoản?</a>
                                <a href="#" className="text-blue-600 hover:underline hover:text-black transition-all animate-link-hover">Quên mật khẩu?</a>
                            </div>
                            <motion.div>
                                <Button type="submit" className="w-full bg-gradient-to-r from-[#FFD700] to-[#FF8C00] hover:from-[#FFC700] hover:to-[#FF7F00] hover:scale-95 text-white font-semibold py-3 rounded-lg drop-shadow-glow">
                                    Đăng nhập
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
