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
