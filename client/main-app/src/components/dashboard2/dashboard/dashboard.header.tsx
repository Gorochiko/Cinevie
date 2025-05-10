import { Calendar } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { ThemeToggle } from "../../../components/theme-toggle"
import { FadeIn } from "../../../components/ui/motion"

export function DashboardHeader() {
  return (
    <header className="border-b bg-card sticky top-0 z-10">
      <FadeIn from="top" className="flex h-16 items-center px-4 gap-4 max-w-[1600px] mx-auto">
        <h1 className="text-lg md:text-xl font-semibold truncate">Thống kê doanh thu</h1>
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px] md:w-[180px]">
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="quarter">Quý này</SelectItem>
              <SelectItem value="year">Năm nay</SelectItem>
              <SelectItem value="all">Tất cả</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="hidden md:flex whitespace-nowrap">
            <Calendar className="mr-2 h-4 w-4" />
            Chọn ngày
          </Button>
          <ThemeToggle />
        </div>
      </FadeIn>
    </header>
  )
}

