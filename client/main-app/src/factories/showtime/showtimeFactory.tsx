import { getShowTime, getTheaters } from "@/lib/actions";
import { CinemaBranch,   Showtime } from "@/types";

class CinemaBranchFactory  {
  constructor(
  public key : string,
  public value : string,
  public label : string,
  ) {}
}





export class ShowtimeFactory {
 
  static async getTheaterOptions():Promise<CinemaBranchFactory[]> {
    const theaters = await getTheaters() as CinemaBranch[];
    const theater = theaters.map((theater) => ({
      key: theater._id,
      value: theater._id,
      label: theater.name,
    }));
    return theater
  }

  static async getShowtimes():Promise<Showtime[]|unknown> {
    return await getShowTime() as Showtime[];
  }
}

