"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {CircleUserIcon} from "lucide-react"

export default function Header() {
   const [isProfileOpen, setIsProfileOpen] = useState(false);  
   const toggleProfile = () => setIsProfileOpen(!isProfileOpen)
   const session = useSession()
   const navItem = ["Movies", "Branches", "Promotion", "Support"];
   return (
      <header className="sticky  top-0  z-50   flex justify-between  items-center px-1 sm:px-4 lg:px-12 py-0 bg-gradient-to-r from-[#1230AE] to-[#C68FE6] text-white shadow-2xl border-b-2 border-white/30">

         <div className="flex h-[auto] items-center transform transition-all hover:scale-105">
            <Link href="/">
               <Image src="/lg1.png" width={30} height={30} alt="Logo" className="w-[65px] drop-shadow-lg animate-wiggle" />
            </Link>
         </div>


         <nav className="hidden md:flex space-x-10 text-lg font-bold">
            {navItem.map((item) => (
               <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="relative group  "
               >
                  <span className="group-hover:text-yellow-300">{item}</span>
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-yellow-300  duration-300 group-hover:w-full"></span>
               </Link>
            ))}
         </nav>

         {session ? (
            <div className="flex items-center gap-4">
               <div className="relative">
                  <Button
                     variant="glass"
                     onClick={toggleProfile}
                     className="flex items-center space-x-0 hover:text-purple-200 transition-colors duration-200"
                  >
                 <CircleUserIcon style={{ width: '23px', height: '23px', color:'antiquewhite'}} />
                     <span>{session.data?.user.name}</span>
                     <ChevronDown size={16} />
                  </Button>
                  <AnimatePresence>
                     {isProfileOpen && (
                        <motion.div
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -10 }}
                           className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700"
                        >
                           <a href="#" className="block px-4 py-2 hover:bg-purple-100">
                              Profile
                           </a>
                           <a onClick={() => signOut()} className="block px-4 py-2 hover:bg-purple-100">
                              Logout
                           </a>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </div>
            </div>
         ) : (
            <Link href="/login">
               <button className="bg-gradient-to-r from-[#FFD700] to-[#FF8C00] hover:from-[#FFC700] hover:to-[#FF7F00] hover:scale-95 text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2 hover:bg-white hover:shadow-[0_0_20px_#3b82f6] transition-all drop-shadow-glow duration-300">
                  <Image src="/iconUser.svg" width={22} height={22} alt="User" />
                  <span>Sign in</span>
               </button>
            </Link>
         )}
         {/* Mobile Menu */}
         <div className="md:hidden">
            <button className="text-white text-3xl hover:text-yellow-300">☰</button>
         </div>
      </header>
   );
}
