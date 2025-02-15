import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { BreadcrumbCollapsed } from "@/components/breadcrumb-app"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar items={
            [{
            title: "Film",
            url: "",
            icon: undefined, 
            items: [
              { title: "Action", url: "/dashboard/Flim" },
              { title: "Comedy", url: "/dashboard/comedy" },
            ],
          },
          {
            title: "Showtimes",
            url: "/#",
            icon: undefined, 
           
          },
          {
            title: "Customer",
            url: "/#",
            icon: undefined
           
          }
        ]
    } />
      <main className="flex flex-col w-full h-full">
  
        <SidebarTrigger />
        <div className="p-4">{children}</div> 
      </main>
      
    </SidebarProvider>
  )
}
