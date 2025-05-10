

import { Suspense } from "react"
import BookingPage from "../../../../components/booking/booking-page"
import { getShowtimeByid } from "../../../../lib/actions"
import { Showtime } from "../../../../types"
import { useParams } from "next/navigation"


export default async function BookingticketPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const getParams = await params; // Chờ cho params được giải quyết
  console.log("All params:", getParams); // Kiểm tra toàn bộ params
  const idShowtime = getParams?.id as string;
  console.log("Extracted ID:", idShowtime); // Xem ID có tồn tại không



 
    const result = await getShowtimeByid(idShowtime)as Showtime;

  
if (!result) {
  return <div>Loading...</div>;
}

 return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPage getShowtime={result} />
    </Suspense>
  );
}