import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { ShowtimeService } from '../showtime/showtime.service';
import { UserService } from '../user/user.service';
import { FoodService } from '../food/food.service';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name)
  private bookingModel : Model<Booking>,
  private showtimeService: ShowtimeService,
  private userService : UserService,
  private foodService : FoodService
  ){}
  async create(createBookingDto: CreateBookingDto) {
    const findSeats = await this.showtimeService.findOne(createBookingDto.showtime)
    if(JSON.stringify(createBookingDto.seats) === JSON.stringify(findSeats.seats)){
        await this.showtimeService.updateSeats(createBookingDto.showtime, { seats: createBookingDto.seats })
    }
    const booking = await this.bookingModel.create({
      user:createBookingDto.user,
      food:createBookingDto.food,
      showtime:createBookingDto.showtime,
      seats:createBookingDto.seats,
      totalPrice:createBookingDto.totalPrice,
      status:createBookingDto.status
    }) 
    return booking.save() ;
  }

  findAll() {
    return `This action returns all booking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  update(id: number, updateBookingDto: UpdateBookingDto) {
    return `This action updates a #${id} booking`;
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
