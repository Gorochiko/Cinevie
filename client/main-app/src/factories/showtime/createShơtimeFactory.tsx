
import { Showtime } from "@/types";
import { parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import { updateStatus } from "@/lib/actions";

const vietnamTimeZone = "Asia/Ho_Chi_Minh";
export function createShowtime(data: Showtime): Showtime {
    // Chuyển đổi múi giờ
    const startTime = toZonedTime(parseISO(data.startTime), vietnamTimeZone).toISOString();
    const endTime = toZonedTime(parseISO(data.endTime), vietnamTimeZone).toISOString();
  
    // Kiểm tra nếu hết thời gian chiếu, cập nhật trạng thái
    if (data.endTime < new Date().toISOString()) {
      updateStatus(data._id ?? "");
    }
  
    return {
      ...data,
      startTime,
      endTime,
    };
  }
