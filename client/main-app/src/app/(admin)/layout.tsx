
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import AdminHeader from '@/components/dashboard/headerAdmin'
import { Toaster } from "@/components/ui/toaster"

export default async function Layout({ children }: { children: React.ReactNode }) {
 

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className=" flex flex-col w-full h-full">
        <div className="w-full h-full  bg-gradient-to-b from-[#C68FE6] to-white  ">
          <Toaster/>
          <div className="fixed top-0 md:left-64 left-0 right-0 z-10">
          <AdminHeader />
          </div>
          <div className=" p-4 rounded-xl mt-16  bg-white ">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
} 
