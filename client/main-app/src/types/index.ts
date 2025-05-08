export
  interface ScreeningRoom {
    _id?:string
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
 interface ShowtimeType {
  films: string;
  price: string;
  theater: string;
  rooms: string;
  dateAction: Date;
  startTime: string;
  endTime: string;
  status?: string;
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
    _id?: string;
    films?:Film
    theater?: CinemaBranch
    rooms?: ScreeningRoom
    dateAction: Date;
    startTime: string;
    endTime: string;
    price: string;
    seats: Seat[]
    availableSeats: number;
    status: string;
   
  }


  export interface FoodItem {
    _id: string
    titleFood: string
    price: number
    details: string
    imageFood: string
  }


export type TicketStatus = "pending" | "paid" 

export interface Combo {
  _id?:string
  food:FoodItem
  quantity: number
}

export interface Ticket {
  _id: string
  status: TicketStatus
  user?: UserType
  showtime: Showtime
  totalPrice: number
  combo: Combo[]
  seats:TypeSeat[]
  createdAt: Date
  paymentMethod:string
  currentStep: number
}

export interface TypeTicket{
  _id?: string
  status: TicketStatus
  user?: UserType
  showtime: Showtime
  totalPrice: number
  combo: Combo[]
  seats:Seat[]
}


export interface Seat{
  seatNumber:string,
  status:string
}

export interface UserType  {
    id: string,
    email: string,
    role:string,
    firstName: string,
    lastName: string,
    isActive: boolean,
    createdAt: Date
    updatedAt: Date
    __v: number
}

export interface TypeSeat{
  row:string,
  number:number
}



export interface SelectSeatAdapter {
  getRows(): string[];
  isSeatSold(row: string, number: number): boolean;
  convertToTypeSeat(row: string, number: number): TypeSeat;
}