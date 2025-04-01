// Movie revenue data
import { getTicket } from "@/lib/actions"
import { Ticket } from "@/types"


export async function getTotalRevenueByMovie() {
  const movieRevenueData = await getTicket() as Ticket[]; 
  const revenueByMovie = movieRevenueData.reduce((acc, ticket) => {
    const movieName = ticket.showtime.films?.title ||  "Unknown Movie";
    if (!acc[movieName]) {
      acc[movieName] = 0;
    }
    acc[movieName] += ticket.totalPrice;
    return acc;
  }, {} as Record<string, number>);
  

  return Object.entries(revenueByMovie).map(([name, revenue]) => ({ name, revenue }));
}



export async function getTotalRevenuePercentageByTheater() {
  const tickets = await getTicket() as Ticket[];
  const revenueByTheater = tickets.reduce<Record<string, number>>((acc, ticket) => {
    const theaterName = ticket.showtime?.theater?.name ?? "Unknown Theater";
    acc[theaterName] = (acc[theaterName] || 0) + (ticket.totalPrice || 0);
    return acc;
  }, {});

  // Tính tổng doanh thu
  const totalRevenue = Object.values(revenueByTheater).reduce((sum, revenue) => sum + revenue, 0);

  // Tính phần trăm doanh thu của từng rạp
  return Object.entries(revenueByTheater).map(([name, revenue]) => ({
    name,
    revenue,
    percentage: totalRevenue ? (revenue / totalRevenue) * 100 : 0 // Trả về number thay vì string
  }));
}

  // Recent transactions data
  export const recentTransactions = [
    {
      id: "TX-1234",
      movie: "Avengers: Endgame",
      theater: "CGV Vincom Center",
      time: "15:30 - 25/03/2025",
      amount: 450000,
    },
    {
      id: "TX-1235",
      movie: "Dune: Part Two",
      theater: "BHD Star Phạm Ngọc Thạch",
      time: "18:45 - 25/03/2025",
      amount: 380000,
    },
    {
      id: "TX-1236",
      movie: "Godzilla x Kong",
      theater: "Lotte Cinema Landmark 81",
      time: "20:15 - 25/03/2025",
      amount: 520000,
    },
    {
      id: "TX-1237",
      movie: "Kung Fu Panda 4",
      theater: "CGV Aeon Mall",
      time: "14:00 - 25/03/2025",
      amount: 320000,
    },
    {
      id: "TX-1238",
      movie: "Dune: Part Two",
      theater: "Galaxy Cinema Nguyễn Du",
      time: "19:30 - 25/03/2025",
      amount: 400000,
    },
  ]
  
  