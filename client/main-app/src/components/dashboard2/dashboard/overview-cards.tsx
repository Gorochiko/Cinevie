import { DollarSign, Film, Ticket, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CountUp, FadeIn } from "@/components/ui/motion"

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <FadeIn delay={100} from="bottom">
        <Card className="overflow-hidden border-b-4 border-b-primary/70 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold truncate">
              <CountUp value={2350000000} formatter={(value:any) => `${value.toLocaleString()} ₫`} />
            </div>
            <p className="text-xs text-muted-foreground">+15.2% so với tháng trước</p>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={200} from="bottom">
        <Card className="overflow-hidden border-b-4 border-b-blue-400/70 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Vé đã bán</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              <CountUp value={125430} formatter={(value) => value.toLocaleString()} />
            </div>
            <p className="text-xs text-muted-foreground">+5.2% so với tháng trước</p>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={300} from="bottom">
        <Card className="overflow-hidden border-b-4 border-b-purple-400/70 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Phim đang chiếu</CardTitle>
            <Film className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              <CountUp value={24} />
            </div>
            <p className="text-xs text-muted-foreground">+3 phim mới trong tháng</p>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={400} from="bottom">
        <Card className="overflow-hidden border-b-4 border-b-green-400/70 transition-all duration-200 hover:shadow-md hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              <CountUp value={3245} formatter={(value) => value.toLocaleString()} />
            </div>
            <p className="text-xs text-muted-foreground">+12.5% so với tháng trước</p>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}

