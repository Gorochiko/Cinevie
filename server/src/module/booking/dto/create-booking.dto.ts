import { IsString } from "class-validator";



export class CreateBookingDto {
    @IsString()
    showtime:string

    @IsString()
    user:string

    @IsString()
    food:string
}
