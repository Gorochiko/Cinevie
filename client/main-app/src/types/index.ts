export interface ScreeningRoom {
    id?: string;
    name: string;
   seats:[string];
  }
  
  export interface CinemaBranch {
    id: string;
    name: string;
    address: string;
    rooms?: ScreeningRoom[];
  }