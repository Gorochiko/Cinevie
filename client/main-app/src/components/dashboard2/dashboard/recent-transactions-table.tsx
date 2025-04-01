"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { recentTransactions } from "@/data/dashboard-data"

export function RecentTransactionsTable() {
  const [visibleRows, setVisibleRows] = useState<number[]>([])

  useEffect(() => {
    // Animate rows appearing one by one
    const timer = setTimeout(() => {
      recentTransactions.forEach((_, index) => {
        setTimeout(() => {
          setVisibleRows((prev) => [...prev, index])
        }, index * 100)
      })
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Mã giao dịch</TableHead>
            <TableHead className="max-w-[150px]">Phim</TableHead>
            <TableHead className="max-w-[150px]">Rạp</TableHead>
            <TableHead className="w-[150px]">Thời gian</TableHead>
            <TableHead className="text-right w-[120px]">Số tiền</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentTransactions.map((transaction, index) => (
            <TableRow
              key={transaction.id}
              className="transition-all duration-300 hover:bg-muted/50 cursor-pointer"
              style={{
                opacity: visibleRows.includes(index) ? 1 : 0,
                transform: visibleRows.includes(index) ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 300ms, transform 300ms",
              }}
            >
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell className="truncate max-w-[150px]">{transaction.movie}</TableCell>
              <TableCell className="truncate max-w-[150px]">{transaction.theater}</TableCell>
              <TableCell>{transaction.time}</TableCell>
              <TableCell className="text-right font-medium">{transaction.amount.toLocaleString()} ₫</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

