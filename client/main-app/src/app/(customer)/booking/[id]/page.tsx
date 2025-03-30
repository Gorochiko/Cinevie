"use client"

import BookingPage from "@/components/booking/booking-page"
import { getShowtimeByid } from "@/lib/actions"
import { Showtime } from "@/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function BookingticketPage() {
  const getParams = useParams()
const idShowtime = getParams?.id as string
const [showtime, setShowtime] = useState<Showtime | null>(null);

useEffect(() => {
  async function fetchShowtime() {
    const result = await getShowtimeByid(idShowtime)as Showtime;
    setShowtime(result);
  }
  fetchShowtime();
}, [idShowtime]);

if (!showtime) {
  return <div>Loading...</div>;
}

return <BookingPage getShowtime={showtime} />;
}