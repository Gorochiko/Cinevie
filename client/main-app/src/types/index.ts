export interface ScreeningRoom {
  id?: string;
  name: string;
  capacity: number;

}

export interface CinemaBranch {
  _id: string;
  name: string;
  address: string;
  rooms?: ScreeningRoom[];
}