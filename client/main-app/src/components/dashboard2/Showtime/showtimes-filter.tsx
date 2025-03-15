"use client"
import { Search } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { getTheaters } from "@/lib/actions"
import { CinemaBranch } from "@/types"

export function ShowtimesFilter() {
    const [date, setDate] = React.useState<Date>()
    const [theaters, setTheaters] = useState<CinemaBranch[]>([]);


    useEffect(() => {
      const fetchTheaters = async () => {
        try {
          const response = await getTheaters() as CinemaBranch[];
          setTheaters(response);
        } catch (error) {
          console.error("Failed to fetch theaters:", error);
        }
      };
  
      fetchTheaters();
    }, []);
  
    // Map theater options
    const theaterOptions = theaters.map((theater) => (
      <SelectItem key={theater._id} value={theater._id}>
        {theater.name}
      </SelectItem>
    ));
    return (
        <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Tìm kiếm theo tên phim..." className="pl-8" />
                </div>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tất cả rạp" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả rạp</SelectItem>
                        {theaterOptions}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <Button variant="outline">Lọc</Button>
                <Button variant="gradient" onClick={() => setDate(undefined)}>Đặt lại</Button>
            </div>
        </div>
    )
}
