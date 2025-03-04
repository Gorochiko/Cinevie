import CinemaBranchManagement from "@/components/dashboard2/cinema-branch-management"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-6 min-h-screen bg-gradient-to-b from-[#C68FE6] to-white text-white relative">
      {/* Hiệu ứng background bokeh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_0%,_rgba(0,0,0,0)_100%)] pointer-events-none"></div>
     

      {/* Khung quản lý */}
      <Card className="shadow-lg border border-gray-200 bg-white/20 backdrop-blur-lg text-white rounded-xl p-6">
        <CardContent>
          <CinemaBranchManagement />
        </CardContent>
      </Card>
    </main>
  )
}
