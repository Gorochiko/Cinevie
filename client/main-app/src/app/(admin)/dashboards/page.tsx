"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"

import { DashboardHeader } from "@/components/dashboard2/dashboard/dashboard.header"
import { MovieRevenueChart } from "@/components/dashboard2/dashboard/movie-revenue-chart"
import { OverviewCards } from "@/components/dashboard2/dashboard/overview-cards"
import { RecentTransactionsTable } from "@/components/dashboard2/dashboard/recent-transactions-table"
import { TheaterRevenueChart } from "@/components/dashboard2/dashboard/theater-revenue-chart"
import { FadeIn } from "@/components/ui/motion"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingDashboard />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <DashboardHeader />

      {/* Dashboard content */}
      <main className="p-4 md:p-6 overflow-x-hidden">
        <div className="grid gap-4 md:gap-6 max-w-[1600px] mx-auto">
          {/* Overview cards */}
          <OverviewCards />

          {/* Charts */}
          <Tabs defaultValue="movies" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger
                value="movies"
                className="transition-all data-[state=active]:bg-[#C68FE6] data-[state=active]:text-primary-foreground"
              >
                Doanh thu theo phim
              </TabsTrigger>
              <TabsTrigger
                value="theaters"
                className="transition-all data-[state=active]:bg-[#C68FE6] data-[state=active]:text-primary-foreground"
              >
                Doanh thu theo rạp
              </TabsTrigger>
            </TabsList>
            <TabsContent value="movies" className="space-y-4 animate-in fade-in-50 slide-in-from-left-5 duration-300">
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle>Doanh thu theo phim</CardTitle>
                  <CardDescription>Top 10 phim có doanh thu cao nhất</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <MovieRevenueChart />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="theaters"
              className="space-y-4 animate-in fade-in-50 slide-in-from-right-5 duration-300"
            >
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle>Doanh thu theo rạp</CardTitle>
                  <CardDescription>Phân bổ doanh thu theo các cụm rạp</CardDescription>
                </CardHeader>
                <CardContent>
                  <TheaterRevenueChart />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Recent transactions */}
          <FadeIn from="bottom" delay={500}>
            <Card className="transition-all duration-300 hover:shadow-md">
              <CardHeader>
                <CardTitle>Giao dịch gần đây</CardTitle>
                <CardDescription>Danh sách các giao dịch mua vé gần đây</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTransactionsTable />
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </main>
    </div>
  )
}

function LoadingDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="flex h-16 items-center px-4 gap-4">
          <Skeleton className="h-6 w-48" />
          <div className="ml-auto flex items-center gap-4">
            <Skeleton className="h-9 w-[180px]" />
            <Skeleton className="h-9 w-32 hidden md:block" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      </header>

      {/* Dashboard content */}
      <main className="p-4 md:p-6 overflow-x-hidden">
        <div className="grid gap-4 md:gap-6 max-w-[1600px] mx-auto">
          {/* Overview cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[104px]" />
            ))}
          </div>

          {/* Charts */}
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-[400px] w-full" />

          {/* Recent transactions */}
          <Skeleton className="h-[400px] w-full" />
        </div>
      </main>
    </div>
  )
}

