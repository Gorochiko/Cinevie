"use client"

import { useEffect, useState } from "react"
import { getTotalRevenueByMovie } from "../../../factories/dashboards/data.dashboards.films"
import { FadeIn } from "../../../components/ui/motion"


const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6666"]
export function MovieRevenueChart() {
  const [animatedData, setAnimatedData] = useState<{ name: string; animatedRevenue: number; color: string }[]>([])
  useEffect(() => {
    async function fetchData() {
      const data = await getTotalRevenueByMovie()
      setAnimatedData(data.map((item, index) => ({
        ...item,
        animatedRevenue: 0,
        color: COLORS[index % COLORS.length]
      })))
      setTimeout(() => {
        setAnimatedData(data.map((item, index) => ({
          ...item,
          animatedRevenue: item.revenue,
          color: COLORS[index % COLORS.length]
        })))
      }, 100)
    }

    fetchData()
  }, [])

  const maxMovieRevenue = Math.max(...animatedData.map((item) => item.animatedRevenue))


  return (
    <div className="w-full">
      <div className="flex flex-col">
        <div className="flex flex-col space-y-3 pt-6">
          {animatedData.map((item, index) => (
            <FadeIn key={index} delay={100 + index * 50} from="left">
              <div className="flex items-center gap-2 md:gap-4 group">
                {/* Thêm màu vào indicator trước tên phim */}
                <div 
                  className="w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                
                <div className="w-20 md:w-40 truncate font-medium group-hover:text-primary transition-colors text-sm md:text-base">
                  {item.name}
                </div>
                
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${(item.animatedRevenue / maxMovieRevenue) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                
                <div 
                  className="w-20 md:w-24 text-right text-sm md:text-base whitespace-nowrap"
                  style={{ color: item.color }}
                >
                  {item.animatedRevenue.toLocaleString()} ₫
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}

