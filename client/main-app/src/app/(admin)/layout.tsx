import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar items={[{ title: "", url: "", icon: undefined, isActive: true }]} />
      <main className="bg-slate-50 w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
