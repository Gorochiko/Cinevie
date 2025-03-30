
import { Seat,SelectSeatAdapter, TypeSeat } from "../types";
export class CinemaSeatAdapter implements SelectSeatAdapter {
    constructor(private seats: Seat[]) {}
  
    getRows(): string[] {
      const rows = this.seats.map((seat) => 
        seat.seatNumber.charAt(0).toUpperCase()
      );
      return Array.from(new Set(rows)).sort((a, b) => a.localeCompare(b));
    }
  
    isSeatAvailable(row: string, number: number): boolean {
      const seatString = `${row}${number}`.toLowerCase();
      const seat = this.seats.find((s) => 
        s.seatNumber.toLowerCase() === seatString
      );
      return seat ? seat.status === "available" : false;
    }
  
    isSeatSold(row: string, number: number): boolean {
      const seatString = `${row}${number}`.toLowerCase();
      const seat = this.seats.find((s) => 
        s.seatNumber.toLowerCase() === seatString
      );
      return !seat || seat.status !== "available";
    }
  
    convertToTypeSeat(row: string, number: number): TypeSeat {
      return { row, number };
    }
  }