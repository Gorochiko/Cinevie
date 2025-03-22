import { getShowTime, getTheaters } from "@/lib/actions";
import { CinemaBranch, Showtime } from "@/types";
import { parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";

import { updateStatus } from "@/lib/actions";

const vietnamTimeZone = "Asia/Ho_Chi_Minh";
export class ShowtimeFactory {
  static async getTheaterOptions() {
    const theaters = (await getTheaters()) as CinemaBranch[];
    return theaters.map((theater) => ({
      key: theater._id,
      value: theater._id,
      label: theater.name,
    }));
  }

  static async getShowtimes() {
    return (await getShowTime()) as Showtime[];
  }
}

