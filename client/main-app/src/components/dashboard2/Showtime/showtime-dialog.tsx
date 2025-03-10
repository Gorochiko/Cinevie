"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, Clock, Save } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// Sample data
const movies = [
  { id: "1", title: "Avengers: Endgame" },
  { id: "2", title: "Tenet" },
  { id: "3", title: "Dune" },
  { id: "4", title: "Spider-Man: No Way Home" },
  { id: "5", title: "The Batman" },
]

const theaters = [
  { id: "1", name: "CGV Aeon Mall", rooms: ["Phòng 1", "Phòng 2", "Phòng 3"] },
  { id: "2", name: "CGV Vincom", rooms: ["Phòng 1", "Phòng 2"] },
  { id: "3", name: "Lotte Cinema", rooms: ["Phòng 1", "Phòng 2", "Phòng 3", "Phòng 4", "Phòng 5"] },
  { id: "4", name: "BHD Star", rooms: ["Phòng 1", "Phòng 2", "Phòng 3"] },
]

const formSchema = z.object({
  movieId: z.string({ required_error: "Vui lòng chọn phim" }),
  theaterId: z.string({ required_error: "Vui lòng chọn rạp" }),
  room: z.string({ required_error: "Vui lòng chọn phòng" }),
  date: z.date({ required_error: "Vui lòng chọn ngày chiếu" }),
  startTime: z.string({ required_error: "Vui lòng nhập giờ bắt đầu" }),
  endTime: z.string({ required_error: "Vui lòng nhập giờ kết thúc" }),
  price: z.string().min(1, "Vui lòng nhập giá vé"),
  totalSeats: z.string().min(1, "Vui lòng nhập tổng số ghế"),
  status: z.enum(["active", "sold-out"], { required_error: "Vui lòng chọn trạng thái" }),
})

type FormValues = z.infer<typeof formSchema>

interface ShowtimeDialogProps {
  children: React.ReactNode
  showtime?: any // Optional showtime data for editing
}

export function ShowtimeDialog({ children, showtime }: ShowtimeDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedTheaterId, setSelectedTheaterId] = useState<string>("")
  const isEditing = !!showtime

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: showtime || {
      movieId: "",
      theaterId: "",  
      room: "",
      startTime: "",
      endTime: "",
      price: "",
      totalSeats: "",
      status: "active",
    },
  })

  // Get available rooms based on selected theater
  const availableRooms = theaters.find((theater) => theater.id === selectedTheaterId)?.rooms || []

  // Handle theater change to update available rooms
  const handleTheaterChange = (value: string) => {
    setSelectedTheaterId(value)
    form.setValue("room", "")
  }

  // Set initial theater ID if editing
  useState(() => {
    if (showtime?.theaterId) {
      setSelectedTheaterId(showtime.theaterId)
    }
  })

  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data)

    // In a real application, you would save the data to your backend here

    // Close the dialog
    setOpen(false)

    // Reset the form
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Chỉnh sửa lịch chiếu" : "Thêm lịch chiếu mới"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Cập nhật thông tin lịch chiếu hiện có" : "Điền đầy đủ thông tin để tạo lịch chiếu mới"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="movieId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phim</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phim" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {movies.map((movie) => (
                          <SelectItem key={movie.id} value={movie.id}>
                            {movie.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="theaterId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rạp</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        handleTheaterChange(value)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn rạp" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {theaters.map((theater) => (
                          <SelectItem key={theater.id} value={theater.id}>
                            {theater.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phòng</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedTheaterId}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={selectedTheaterId ? "Chọn phòng" : "Chọn rạp trước"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableRooms.map((room) => (
                          <SelectItem key={room} value={room}>
                            {room}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Ngày chiếu</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP", { locale: vi }) : <span>Chọn ngày</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          locale={vi}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giờ bắt đầu</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input {...field} type="time" />
                        </FormControl>
                        <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giờ kết thúc</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input {...field} type="time" />
                        </FormControl>
                        <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá vé (VNĐ)</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min="0" step="1000" />
                    </FormControl>
                    <FormDescription>Nhập giá vé bằng VNĐ (ví dụ: 120000)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

          

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Đang bán</SelectItem>
                        <SelectItem value="sold-out">Hết vé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Hủy
              </Button>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {isEditing ? "Cập nhật" : "Tạo lịch chiếu"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

