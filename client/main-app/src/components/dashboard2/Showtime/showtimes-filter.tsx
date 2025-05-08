"use client"
import { Loader2, RefreshCw, Search } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { use, useEffect, useState } from "react"
import { ShowtimesTable } from "./showtimes-table"
import { Showtime } from "@/types"

interface CinemaProp {
    theaterOptions: Array<{ key: string; value: string; label: string }>
    refreshData: () => Promise<void>
    showtimes: Showtime[]; 
    setFilteredShowtimes: (showtimes: Showtime[]) => void;
}

export function ShowtimesFilter({ refreshData, theaterOptions, showtimes,setFilteredShowtimes}: CinemaProp) {
    const [date, setDate] = useState<Date>();
    const [pending, setPending] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedTheater, setSelectedTheater] = useState("all");
   
    useEffect(() => {
      let filtered = showtimes;
  
      if (search) {
        filtered = filtered.filter((showtime) =>
          showtime.films?.title.toLowerCase().includes(search.toLowerCase())
        );
      }
  
      if (selectedTheater !== "all") {
        filtered = filtered.filter((showtime) => showtime.theater?._id === selectedTheater);
      }
  
      if (date) {
        filtered = filtered.filter(
          (showtime) => new Date(showtime.startTime).toDateString() === date.toDateString()
        );
      }
  
      setFilteredShowtimes(filtered);
    }, [search, selectedTheater, date, showtimes]);
  
    const handleRefresh = async () => {
      try {
        setPending(true);
        await refreshData();
      } finally {
        setPending(false);
      }
    };

    useEffect(() => {handleRefresh()},[])

    return (
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm theo tên phim..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={selectedTheater} onValueChange={setSelectedTheater}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tất cả rạp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả rạp</SelectItem>
                {theaterOptions.map((option) => (
                  <SelectItem key={option.key} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Chọn ngày</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                {/* <Calendar mode="single" selected={date} onSelect={setDate} initialFocus /> */}
              </PopoverContent>
            </Popover>
            <Button variant="outline" onClick={() => setDate(undefined)}>Xóa lọc</Button>

            <Button variant="gradient" onClick={handleRefresh}>
              {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">Làm mới</span>
            </Button>
          </div>
    
          
      
        </div>
    )
}
