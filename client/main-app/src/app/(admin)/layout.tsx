
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

import { auth } from "@/lib/auth";
import AdminHeader from '@/components/dashboard/headerAdmin'
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
 

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" flex flex-col w-full h-full">
        <div className="w-full h-full  bg-gradient-to-b from-[#C68FE6] to-white  ">
          <AdminHeader />
          <div className=" p-4 rounded-xl  bg-white ">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
} 
