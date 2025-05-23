/* eslint-disable ../../..typescript-eslint/no-explicit-any */
"use client"
import type React from "react"
import { useEffect, useState } from "react"
import {  Clock, Save } from "lucide-react"

import { Button } from "../../../components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShowtimeType } from "../../../types"
import { createShowtimes, getFilms, getTheaters } from "../../../lib/actions"
import { CinemaBranch } from "../../../types";
import { toast } from "../../../hooks/use-toast"
import { Film } from "../../../types/index"
import { LoadingCat } from "../../../components/loading/loading-cat"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export const showtimeFormSchema = z.object({
  films: z.string().min(1, "Vui lòng chọn phim"),
  price: z.string().min(1, "Vui lòng nhập giá vé"),
  theater: z.string().min(1, "Vui lòng chọn rạp"),
  rooms: z.string().min(1, "Vui lòng chọn phòng"),
  dateAction: z.date({
    required_error: "Vui lòng chọn ngày chiếu",
  }),
  startTime: z.string().min(1, "Vui lòng chọn giờ bắt đầu"),
  endTime: z.string().min(1, "Vui lòng chọn giờ kết thúc"),
  status: z.string().optional()
});


export type ShowtimeFormValues = z.infer<typeof showtimeFormSchema>;

interface ShowtimeDialogProps {
  children: React.ReactNode
  showtime?: any
}

export function ShowtimeDialog({ children, showtime }: ShowtimeDialogProps) {
  const [branches, setBranches] = useState<CinemaBranch[]>([]);
  const fetchBranches = async () => {
    try {
      const data = await getTheaters() as CinemaBranch[];
      setBranches(data);
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);
  const [open, setOpen] = useState(false)
  const [selectedTheaterId, setSelectedTheaterId] = useState<string>("")
  const isEditing = !!showtime
  const [films, setFilms] = useState<Film[]>([]);
  const [loading] = useState(false);
  const [loadingFilms, setLoadingFilms] = useState(false);
  const [errorFilms, setErrorFilms] = useState<string | null>(null);
  useEffect(() => {
    const fetchFilms = async () => {
      setLoadingFilms(true);
      setErrorFilms(null);
      try {
        const response = await getFilms();
        console.log("Films data:", response); // Thêm log để kiểm tra dữ liệu

        // Đảm bảo response là mảng và có dữ liệu
        const filmsData = Array.isArray(response) ? response : [];
        setFilms(filmsData);

        if (filmsData.length === 0) {
          setErrorFilms("Không có phim nào trong hệ thống");
        }
      } catch (error: any) {
        console.error('Error fetching films:', error);
        setErrorFilms(error.message || 'Không thể tải danh sách phim');
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể tải danh sách phim",
        });
      } finally {
        setLoadingFilms(false);
      }
    };

    fetchFilms();
  }, []);
  const form = useForm<ShowtimeFormValues>({
    resolver: zodResolver(showtimeFormSchema),
    defaultValues: showtime || {
      films: "",
      theater: "",
      rooms: "",
      price: "",
      startTime: "",
      endTime: "",
      status: "active"
    }
  });



  const availableRooms = branches.find((theater) => theater._id === selectedTheaterId)?.rooms || []

  // Handle theater change to update available rooms
  const handleTheaterChange = (value: string) => {
    setSelectedTheaterId(value)
    form.setValue("rooms", "")
  }


  useState(() => {
    if (showtime?.theaterId) {
      setSelectedTheaterId(showtime.theaterId)
    }
  })

  async function onSubmit(data: ShowtimeType) {
    try {
      const dateString = data.dateAction.toISOString().split('T')[0];
      console.log(availableRooms);
      const formattedData = {
        ...data,
        rooms: data.rooms,
        startTime: new Date(`${dateString}T${data.startTime}:00`).toISOString(),
        endTime: new Date(`${dateString}T${data.endTime}:00`).toISOString(),
      };

      await createShowtimes(formattedData)

      setOpen(false);
      form.reset()
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message })
    }

  }
  if (loading) return <div><LoadingCat /></div>
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
                name="films"
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
                        {loadingFilms ? (
                          <div className="p-2 text-center">
                            <LoadingCat />
                          </div>
                        ) : errorFilms ? (
                          <div className="p-2 text-center text-red-500 text-sm">
                            {errorFilms}
                          </div>
                        ) : films.length === 0 ? (
                          <div className="p-2 text-center text-gray-500 text-sm">
                            Không có phim nào
                          </div>
                        ) : (
                          films.map((movie) => (
                            <SelectItem key={movie._id} value={movie._id}>
                              {movie.title}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="theater"
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
                        {branches.map((theater) => (
                          <SelectItem key={theater._id} value={theater._id}>
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
                name="rooms"
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
                          <SelectItem key={room._id} value={room._id as string}>
                            {room.name}
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
                name="dateAction"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Ngày chiếu</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <DatePicker
                            selected={field.value}
                            onChange={field.onChange}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Chọn ngày"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        {/* <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          locale={vi}
                        /> */}
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
                          <Input {...field} type="time" value={field.value || "00:00"} />
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
                          <Input {...field} type="time" value={field.value || "00:00"} />
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
                      <Input {...field} type="number" min="50000" step="5000" />
                    </FormControl>
                    <FormDescription>Nhập giá vé bằng VNĐ (ví dụ: 120000)</FormDescription>
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

