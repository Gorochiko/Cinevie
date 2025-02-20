"use client";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { User } from 'lucide-react';
import { Video } from 'lucide-react';
import { Clapperboard } from 'lucide-react';
import AdminHeader from '@/components/dashboard/headerAdmin'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <SidebarProvider>
      <AppSidebar items={
        [{
          title: "Film",
          url: "/flim",
          icon: Clapperboard,

        },
        {
          title: "Showtimes",
          url: "/showtime",
          icon: Video,
        },
        {
          title: "Customer",
          url: "/customer",
          icon: User,

        }
        ]
      } />

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
