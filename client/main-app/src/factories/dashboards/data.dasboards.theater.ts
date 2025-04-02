// Movie revenue data
import { getTicket } from "@/lib/actions"
import { Ticket } from "@/types"

export async function getTotalRevenuePercentageByTheater() {
  const tickets = await getTicket() as Ticket[];
  const revenueByTheater = tickets.reduce<Record<string, number>>((acc, ticket) => {
    const theaterName = ticket.showtime?.theater?.name ?? "Unknown Theater";
    acc[theaterName] = (acc[theaterName] || 0) + (ticket.totalPrice || 0);
    return acc;
  }, {});
  const totalRevenue = Object.values(revenueByTheater).reduce((sum, revenue) => sum + revenue, 0);
  return Object.entries(revenueByTheater).map(([name, revenue]) => ({
    name,
    revenue,
    percentage: totalRevenue ? (revenue / totalRevenue) * 100 : 0 
  }));
}
