"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getTicket } from "@/lib/actions"
import { Ticket } from "@/types"

export function RecentTransactionsTable() {
  const [visibleRows, setVisibleRows] = useState<number[]>([])
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const ticketData = await getTicket() as Ticket[]
        if (!Array.isArray(ticketData)) {
          setLoading(false)
          return
        }
        
        // Sắp xếp theo thời gian tạo mới nhất và lấy 5 vé đầu tiên
        const recentTickets = ticketData
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5)
          
        setTickets(recentTickets)
        setLoading(false)
        
        // Animate rows appearing one by one
        recentTickets.forEach((_, index) => {
          setTimeout(() => {
            setVisibleRows((prev) => [...prev, index])
          }, index * 100)
        })
      } catch (error) {
        console.error("Failed to fetch tickets:", error)
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!tickets.length) {
    return <div>Không có giao dịch nào</div>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Mã vé</TableHead>
            <TableHead className="max-w-[150px]">Phim</TableHead>
            <TableHead className="max-w-[150px]">Rạp</TableHead>
            <TableHead className="w-[150px]">Ngày đặt</TableHead>
            <TableHead className="w-[100px]">Ghế</TableHead>
            <TableHead className="text-right w-[120px]">Tổng tiền</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow
              key={ticket._id}
              className="transition-all duration-300 hover:bg-muted/50 cursor-pointer"
              style={{
                opacity: visibleRows.includes(index) ? 1 : 0,
                transform: visibleRows.includes(index) ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 300ms, transform 300ms",
              }}
            >
              <TableCell className="font-medium">{ticket._id.slice(-6).toUpperCase()}</TableCell>
              <TableCell className="truncate max-w-[150px]">{ticket.showtime.films?.title}</TableCell>
              <TableCell className="truncate max-w-[150px]">{ticket.showtime.theater?.name}</TableCell>
              <TableCell>
                {new Date(ticket.createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </TableCell>
              <TableCell>
                {ticket.seats.join(', ')}
              </TableCell>
              <TableCell className="text-right font-medium">
                {ticket.totalPrice.toLocaleString('vi-VN')} ₫
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}