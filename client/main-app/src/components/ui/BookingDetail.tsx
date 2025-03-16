"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface Film {
  title: string;
  format: string;
}

interface CinemaBranch {
  name: string;
}

interface ScreeningRoom {
  name: string;
}

interface Showtime {
  _id: string;
  films: Film;
  theater: CinemaBranch;
  rooms: ScreeningRoom;
  dateAction: Date;
  startTime: string;
  endTime: string;
  price: string;
  availableSeats: number;
  status: string;
}

const showtimes: Showtime[] = [
  {
    _id: "1",
    films: { title: "2D Phụ Đề", format: "2D" },
    theater: { name: "Galaxy Nguyễn Du" },
    rooms: { name: "Room 1" },
    dateAction: new Date(),
    startTime: "18:45",
    endTime: "20:45",
    price: "100000",
    availableSeats: 50,
    status: "available",
  },
  {
    _id: "2",
    films: { title: "2D Phụ Đề", format: "2D" },
    theater: { name: "Galaxy Tân Bình" },
    rooms: { name: "Room 2" },
    dateAction: new Date(),
    startTime: "10:30",
    endTime: "12:30",
    price: "100000",
    availableSeats: 40,
    status: "available",
  },
  {
    _id: "3",
    films: { title: "Samsung Neo QLED 8K 2D Phụ Đề", format: "2D" },
    theater: { name: "Galaxy Sala" },
    rooms: { name: "Room 3" },
    dateAction: new Date(),
    startTime: "18:15",
    endTime: "20:15",
    price: "120000",
    availableSeats: 35,
    status: "available",
  },
];
const handleRedirect = () => {
  router.push("/support");
};
const ShowtimesList: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lịch Chiếu</h1>
      <Separator />
      {showtimes.map((showtime, index) => (
        <Card key={index} className="my-4">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold">{showtime.theater.name}</h2>
            <p className="text-sm text-gray-600">{showtime.films.title}</p>
            <div className="flex items-center gap-2 mt-2">
              <Link href="/booking">
                <button
                className="bg-gray-200 px-3 py-1 rounded-full hover:bg-blue-800 hover:text-white text-sm"
                >
                {showtime.startTime}
                </button>
              </Link>
                
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ShowtimesList;
