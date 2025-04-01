"use client"

import { useEffect, useState } from "react"
import { getTotalRevenuePercentageByTheater } from "@/data/dashboard-data"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { CountUp, FadeIn } from "@/components/ui/motion"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6666"]

export function TheaterRevenueChart() {
  const [theaterRevenueData, setTheaterRevenueData] = useState<{ 
    name: string; 
    percentage: number; 
    revenue: number;
    color: string 
  }[]>([])
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [animationProgress, setAnimationProgress] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const data = await getTotalRevenuePercentageByTheater()
      const total = data.reduce((sum, item) => sum + item.revenue, 0)
      
      const formattedData = data.map((item, index) => ({
        name: item.name,
        percentage: item.percentage,
        revenue: item.revenue,
        color: COLORS[index % COLORS.length]
      }))
      
      setTheaterRevenueData(formattedData)
      setTotalRevenue(total)

      setTimeout(() => {
        setAnimationProgress(1)
      }, 300)
    }

    fetchData()
  }, [])

  return (
    <div className="w-full h-auto min-h-[300px] md:h-[400px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        {/* Pie Chart */}
        <FadeIn delay={100} from="bottom" className="flex flex-col items-center justify-center py-4">
          <div className="relative w-full h-64 md:h-80 transition-all duration-500 hover:scale-105">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={theaterRevenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="percentage"
                  label={({ name, percentage }) => `${name}: ${percentage.toFixed(2)}%`}
                >
                  {theaterRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}%`, "Tỷ lệ"]}
                  labelFormatter={(name) => `Rạp: ${name}`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </FadeIn>

        {/* Legend and Details */}
        <div className="flex flex-col justify-center overflow-y-auto max-h-[300px] md:max-h-none pr-2">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Tổng doanh thu</h3>
            <CountUp 
              value={totalRevenue / 1000000} 
              className="text-2xl font-bold" 
              formatter={(value) => `${value.toFixed(2)}M ₫`}
            />
          </div>
          
          <div className="space-y-2 md:space-y-4">
            {theaterRevenueData.map((item, index) => (
              <FadeIn key={index} delay={200 + index * 100} from="right">
                <div className="flex items-center gap-2 md:gap-3 group p-1 md:p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
                  <div
                    className="w-3 h-3 md:w-4 md:h-4 rounded-full transition-transform duration-200 group-hover:scale-125"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium group-hover:text-primary transition-colors truncate text-sm md:text-base">
                        {item.name}
                      </span>
                      <span className="font-semibold text-sm md:text-base whitespace-nowrap ml-1">
                        {item.percentage.toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${item.percentage * animationProgress}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">
                      <CountUp
                        value={item.revenue / 1000000}
                        formatter={(value) => `${value.toFixed(2)}M ₫`}
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}