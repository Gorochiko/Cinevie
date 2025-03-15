"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { StatisticsCards } from "@/components/dashboard2/Tickets/statistics-cards"
import { SearchFilter } from "@/components/dashboard2/Tickets/search-filter"
import { TableActions } from "@/components/dashboard2/Tickets/table-actions"
import { TicketTable } from "@/components/dashboard2/Tickets/ticket-table"
import { TicketDetailsDialog } from "@/components/dashboard2/Tickets/ticket-details-dialog"
import { Pagination } from "@/components/dashboard2/Tickets/pagination"

import { formatCurrency } from "@/lib/utils"
import type { Ticket } from "@/types/index"


// Sample data
export const tickets: Ticket[] = [
  {
    id: "TKT-001",
    status: "confirmed",
    customerEmail: "nguyen.van.a@example.com",
    movie: "Avengers: Endgame",
    showtime: "2025-03-15 19:30",
    totalAmount: 250000,
    concessions: [
      { name: "Combo 1 (Popcorn Large + 2 Drinks)", quantity: 1, price: 120000 },
      { name: "Caramel Popcorn", quantity: 1, price: 60000 },
    ],
    seats: ["G7", "G8"],
    purchaseDate: "2025-03-10 14:22",
  },
  {
    id: "TKT-002",
    status: "pending",
    customerEmail: "tran.thi.b@example.com",
    movie: "Dune: Part Two",
    showtime: "2025-03-14 20:15",
    totalAmount: 180000,
    concessions: [
      { name: "Popcorn Medium", quantity: 1, price: 50000 },
      { name: "Coca Cola", quantity: 2, price: 30000 },
    ],
    seats: ["E5","A3"],
    purchaseDate: "2025-03-13 09:45",
  },
  {
    id: "TKT-003",
    status: "used",
    customerEmail: "le.minh.c@example.com",
    movie: "The Batman",
    showtime: "2025-03-12 18:00",
    totalAmount: 350000,
    concessions: [{ name: "Combo 2 (Popcorn Large + Nachos + 2 Drinks)", quantity: 1, price: 150000 }],
    seats: ["D12", "D13", "D14"],
    purchaseDate: "2025-03-08 16:30",
  },
  {
    id: "TKT-004",
    status: "cancelled",
    customerEmail: "pham.hong.d@example.com",
    movie: "Oppenheimer",
    showtime: "2025-03-13 19:00",
    totalAmount: 200000,
    concessions: [],
    seats: ["F9", "F10"],
    purchaseDate: "2025-03-07 20:15",
  },
  {
    id: "TKT-005",
    status: "confirmed",
    customerEmail: "hoang.nam.e@example.com",
    movie: "Godzilla x Kong",
    showtime: "2025-03-16 15:45",
    totalAmount: 420000,
    concessions: [{ name: "Family Combo (2 Large Popcorn + 4 Drinks + 2 Hotdogs)", quantity: 1, price: 250000 }],
    seats: ["H3", "H4", "H5", "H6"],
    purchaseDate: "2025-03-12 11:20",
  },
  {
    id: "TKT-006",
    status: "confirmed",
    customerEmail: "hoang.nam.e@example.com",
    movie: "Godzilla x Kong",
    showtime: "2025-03-16 15:45",
    totalAmount: 420000,
    concessions: [{ name: "Family Combo (2 Large Popcorn + 4 Drinks + 2 Hotdogs)", quantity: 1, price: 250000 }],
    seats: ["H3", "H4", "H5", "H6"],
    purchaseDate: "2025-03-12 11:20",
  },
  {
    id: "TKT-007",
    status: "confirmed",
    customerEmail: "hoang.nam.e@example.com",
    movie: "Godzilla x Kong",
    showtime: "2025-03-16 15:45",
    totalAmount: 420000,
    concessions: [{ name: "Family Combo (2 Large Popcorn + 4 Drinks + 2 Hotdogs)", quantity: 1, price: 250000 }],
    seats: ["H3", "H4", "H5", "H6"],
    purchaseDate: "2025-03-12 11:20",
  },
]


export default function AdminDashboardTicket() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [ticketsData, setTicketsData] = useState<Ticket[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setTicketsData(tickets)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle refresh action
  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 800)
  }

  // Filter tickets based on search term and status
  const filteredTickets = ticketsData.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.movie.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Handle viewing ticket details
  const viewTicketDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setDetailsOpen(true)
  }

  
  const confirmedTickets = ticketsData.filter((t) => t.status === "confirmed").length
  const pendingTickets = ticketsData.filter((t) => t.status === "pending").length
  const totalRevenue = ticketsData.reduce(
    (sum, ticket) => (ticket.status !== "cancelled" ? sum + ticket.totalAmount : sum),
    0,
  )

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <StatisticsCards
            totalTickets={ticketsData.length}
            confirmedTickets={confirmedTickets}
            pendingTickets={pendingTickets}
            totalRevenue={totalRevenue}
            isLoading={isLoading}
            formatCurrency={formatCurrency}
          />
          <Card className="transition-all duration-300">
            <CardHeader>
              <TableActions isRefreshing={isRefreshing} handleRefresh={handleRefresh} />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <SearchFilter
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                />
                <TicketTable
                  tickets={filteredTickets}
                  isLoading={isLoading}
                  formatCurrency={formatCurrency}
                  viewTicketDetails={viewTicketDetails}
                />
                <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <TicketDetailsDialog
        ticket={selectedTicket}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        formatCurrency={formatCurrency}
      />
    </div>
  )
}

