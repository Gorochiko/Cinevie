import { getShowTime, getTheaters } from "@/lib/actions";
import { CinemaBranch, Film, ScreeningRoom, Seat, Showtime } from "@/types";

class CinemaBranchModel implements CinemaBranch {
  constructor(
    public _id: string,
    public name: string,
    public address: string,
    public rooms?: ScreeningRoom[]
  ) {}
}

class ShowtimeModel implements Showtime {
  constructor(
    public _id: string,
    public films: Film,
    public theater: CinemaBranch,
    public rooms: ScreeningRoom,
    public dateAction: Date,
    public startTime: string,
    public endTime: string,
    public price: string,
    public seats: Seat[],
    public availableSeats: number,
    public status: string
  ) {}
}


export class ShowtimeFactory {
  static async getTheaterOptions() {
    const theaters = await getTheaters() as CinemaBranch[];
    const theater = theaters.map((theater) => ({
      key: theater._id,
      value: theater._id,
      label: theater.name,
    }));
    return theater
  }

  static async getShowtimes() {
    return await getShowTime() as Showtime[];
  }
}

