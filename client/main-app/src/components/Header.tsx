"use client";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
   const navItem = ["Movies", "Branches", "Promotions", "Support"];
   return (
      <header className="flex justify-between items-center px-1 sm:px-4 lg:px-12 py-0 bg-gradient-to-r from-red-500 via-blue-500 to-white text-white shadow-2xl border-b-2 border-white/30">

         <div className="flex h-[auto] items-center transform transition-all hover:scale-105">
            <Link href="/">
               <Image src="/logocinevie.svg" width={30} height={30} alt="Logo" className="w-[65px] drop-shadow-lg" />
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

         <Link href="/login">
            <button className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full flex items-center gap-2 hover:bg-blue-500 hover:shadow-[0_0_20px_#3b82f6] transition-all duration-300">
               <Image src="/iconUser.svg" width={22} height={22} alt="User" />
               <span>Sign in</span>
            </button>
         </Link>

         {/* Mobile Menu */}
         <div className="md:hidden">
            <button className="text-white text-3xl hover:text-yellow-300">☰</button>
         </div>
      </header>
   );
}
