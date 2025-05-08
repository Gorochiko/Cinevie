import { PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ShowtimeDialog } from "@/components/dashboard2/Showtime/showtime-dialog"
import { ShowtimeFactory } from "@/factories/showtime/showtimeFactory"
import { Showtime } from "@/types"
import { toast } from "@/hooks/use-toast"
import { revalidatePath } from "next/cache"
import { ShowtimesContainer } from '@/components/dashboard2/Showtime/showtime-container'
import { getFilms, getTheaters } from '@/lib/actions'

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
async function refreshData() {
  "use server"
  try {
    revalidatePath("/admin/showtimes")
  } catch (error) {
    console.error('Refresh data error:', error);
    toast({
      title: "Lỗi",
      variant: "destructive",
      description: "Có lỗi xảy ra khi làm mới dữ liệu.",
    });
  }
}



export default async function ShowtimesPage() {
  try {
    // Add error boundaries and loading states
    const [theaters, films] = await Promise.all([
      getTheaters().catch(error => {
        console.error('Error fetching theaters:', error);
        return [];
      }),
      getFilms().catch(error => {
        console.error('Error fetching films:', error);
        return [];
      })
    ]);
  const theaterOptions = await ShowtimeFactory.getTheaterOptions();
  const showtimes = await ShowtimeFactory.getShowtimes() as Showtime[];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold tracking-tight">Quản lý Lịch chiếu</h1>
          <p className="text-muted-foreground">Quản lý tất cả các lịch chiếu phim tại các rạp</p>
        </div>
        <ShowtimeDialog>
          <Button className="animate-pulse-subtle hover:shadow-lg transition-all duration-300">
            <PlusCircle className="mr-2 h-4 w-4" />
            Thêm lịch chiếu mới
          </Button>
        </ShowtimeDialog>
      </div>
      <ShowtimesContainer
        showtimes={showtimes}
        refreshData={refreshData}
        theaterOptions={theaterOptions}
      />
    </div>

  );
}catch (error) {
  console.error('Error in ShowtimesPage:', error);
  return <div>Error loading showtimes. Please try again later.</div>;
}
}
