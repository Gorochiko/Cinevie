  
   import Link from "next/link"
   import Image from "next/image"
   export default function Header(){
      return(
         <div className="flex justify-between sm:flex-row items-center px-8 bg-gradient-to-r from-red-500 via-blue-500 to-white text-white   top-0 left-0 right-0 backdrop-filter backdrop-blur-xl">
         <div className="flex items-center">
         <Link href="/">
            <Image src="/logocinevie.svg" 
                  width={50}
                  height={50}
                  className="w-[65px] h-[auto]" 
                  alt="Icon" 
            />
         </Link>
         </div>

         {/* Navigation */}
         <ul className="hidden md:flex space-x-8">
         <li>
            <Link
               href="/movies"
               className="text-lg font-medium hover:text-red-700 transition duration-200"
            >
               Movies
            </Link>
         </li>
         <li>
            <Link
               href="/branches"
               className="text-lg font-medium hover:text-blue-700 transition duration-200"
            >
               Branches
            </Link>
         </li>
         <li>
            <Link
               href="/promotions"
               className="text-lg font-medium hover:text-red-700 transition duration-200"
            >
               Promotions
            </Link>
         </li>
         <li>
            <Link
               href="/support"
               className="text-lg font-medium hover:text-blue-700 transition duration-200"
            >
               Support
            </Link>
         </li>
         </ul>

         <div className="flex items-center space-x-4">
         
            <Link href="/auth/login">
               <button className="bg-red-500 text-white rounded-full px-6 py-2 flex items-center hover:bg-blue-500 hover:shadow-lg transition-all duration-300">
               <i className="fas fa-user mr-2">
                  <Image src="/iconUser.svg" 
                  width={20} 
                  height={20}
                   alt="iconUser"
                  />
               </i>
               <span className="font-semibold">Sign in</span>
               </button>
            </Link>
         
         </div>
      </div>
      )
   }