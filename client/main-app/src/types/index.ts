export
  interface ScreeningRoom {

  name: string;
  capacity: number;
  screenType?: string
}

export
  interface CinemaBranch {
  _id: string;
  name: string;
  address: string;
  rooms?: ScreeningRoom[];
}


export
  interface showtimeType {
  films: string
  theater: string,
  rooms: string,
  price: string,
  dateAction: Date,
  startTime: Date,
  endTime: Date,
  status: string
}

export
  interface Film {
  _id: string;
  title: string;
  description: string;
  age: number;
  timeLength: number;
  year: number;
  onStage: string;
  image: string;
}



export
 interface Showtime {
    _id: string;
    films:Film
    theater: CinemaBranch
    rooms: ScreeningRoom
    dateAction: Date;
    startTime: string;
    endTime: string;
    price: string;
    availableSeats: number;
    status: string;
    
  }

  export interface FoodItem {
    _id: string
    titleFood: string
    price: string
    details: string
    imageFood: string
  }


  export type TicketStatus = "pending" | "confirmed" | "used" | "cancelled"

export interface Concession {
  name: string
  quantity: number
  price: number
}

export interface Ticket {
  id: string
  status: TicketStatus
  customerEmail: string
  movie: string
  showtime: string
  totalAmount: number
  concessions: Concession[]
  seats: string[]
  purchaseDate: string
}