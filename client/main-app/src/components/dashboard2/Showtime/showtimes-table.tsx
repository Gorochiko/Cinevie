"use client"

import { useState } from "react"
import { Calendar, Clock, Edit, MapPin, MoreHorizontal, Trash2, Users } from "lucide-react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShowtimeDialog } from "./showtime-dialog"

// Sample data for showtimes
const showtimes = [
  {
    id: "1",
    movieId: "1",
    theaterId: "1",
    movieTitle: "Avengers: Endgame",
    theater: "CGV Aeon Mall",
    room: "Phòng 3",
    date: new Date("2024-03-10"),
    startTime: "19:30",
    endTime: "22:15",
    price: "120000",
    availableSeats: 45,
    totalSeats: "120",
    status: "active",
    posterUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "2",
    movieId: "2",
    theaterId: "2",
    movieTitle: "Tenet",
    theater: "CGV Vincom",
    room: "Phòng 1",
    date: new Date("2024-03-10"),
    startTime: "20:00",
    endTime: "22:30",
    price: "100000",
    availableSeats: 80,
    totalSeats: "100",
    status: "active",
    posterUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "3",
    movieId: "3",
    theaterId: "3",
    movieTitle: "Dune",
    theater: "Lotte Cinema",
    room: "Phòng 5",
    date: new Date("2024-03-11"),
    startTime: "18:15",
    endTime: "21:00",
    price: "110000",
    availableSeats: 0,
    totalSeats: "80",
    status: "sold-out",
    posterUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "4",
    movieId: "4",
    theaterId: "4",
    movieTitle: "Spider-Man: No Way Home",
    theater: "BHD Star",
    room: "Phòng 2",
    date: new Date("2024-03-12"),
    startTime: "17:45",
    endTime: "20:15",
    price: "95000",
    availableSeats: 60,
    totalSeats: "90",
    status: "active",
    posterUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "5",
    movieId: "5",
    theaterId: "1",
    movieTitle: "The Batman",
    theater: "CGV Aeon Mall",
    room: "Phòng 1",
    date: new Date("2024-03-13"),
    startTime: "19:00",
    endTime: "21:45",
    price: "130000",
    availableSeats: 75,
    totalSeats: "120",
    status: "active",
    posterUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "6",
    movieId: "1",
    theaterId: "2",
    movieTitle: "Black Widow",
    theater: "CGV Vincom",
    room: "Phòng 2",
    date: new Date("2024-03-14"),
    startTime: "18:30",
    endTime: "20:45",
    price: "105000",
    availableSeats: 50,
    totalSeats: "100",
    status: "active",
    posterUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "7",
    movieId: "2",
    theaterId: "3",
    movieTitle: "Shang-Chi",
    theater: "Lotte Cinema",
    room: "Phòng 3",
    date: new Date("2024-03-15"),
    startTime: "19:15",
    endTime: "21:30",
    price: "115000",
    availableSeats: 65,
    totalSeats: "90",
    status: "active",
    posterUrl: "/placeholder.svg?height=300&width=200",
  },
  {
    id: "8",
    movieId: "3",
    theaterId: "4",
    movieTitle: "No Time to Die",
    theater: "BHD Star",
    room: "Phòng 1",
    date: new Date("2024-03-16"),
    startTime: "20:00",
    endTime: "22:45",
    price: "125000",
    availableSeats: 0,
    totalSeats: "110",
    status: "sold-out",
    posterUrl: "/placeholder.svg?height=300&width=200",
  },
]

export function ShowtimesTable() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setSelectedShowtime(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    console.log(`Deleting showtime with ID: ${selectedShowtime}`)
    setShowDeleteDialog(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {showtimes.map((showtime) => (
          <Card key={showtime.id} className="overflow-hidden">
            <div className="relative h-48 bg-muted">
              <img
                src={showtime.posterUrl || "/placeholder.svg"}
                alt={showtime.movieTitle}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={showtime.status === "active" ? "default" : "destructive"}>
                  {showtime.status === "active" ? "Đang bán" : "Hết vé"}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-1">{showtime.movieTitle}</h3>

              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <div>{showtime.theater}</div>
                    <div className="text-muted-foreground">{showtime.room}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>{format(showtime.date, "dd/MM/yyyy", { locale: vi })}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    {showtime.startTime} - {showtime.endTime}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div>
                    {showtime.availableSeats}/{showtime.totalSeats} ghế trống
                  </div>
                </div>

                <div className="font-medium">{Number.parseInt(showtime.price).toLocaleString("vi-VN")} VNĐ</div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <ShowtimeDialog showtime={showtime}>
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Chỉnh sửa
                </Button>
              </ShowtimeDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Mở menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => handleDelete(showtime.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa lịch chiếu</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa lịch chiếu này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Xóa lịch chiếu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

