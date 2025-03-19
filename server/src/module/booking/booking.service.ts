import { ConflictException, Injectable } from '@nestjs/common';
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
  // private userService : UserService,
  // private foodService : FoodService
  ){}

  async create(createBookingDto: CreateBookingDto) {
    const showtime  = await this.showtimeService.findOne(createBookingDto.showtime)
    const checkSeats = createBookingDto.seats.filter(seatNumber => {
      const seat = showtime.seats.find(s => s.seatNumber === seatNumber);
      return !seat || seat.status !== 'available';
    });
    if (checkSeats.length > 0) {
      throw new ConflictException(`Seats ${checkSeats.join(' , ')} are already booked or not available`);
    }
    await this.showtimeService.bookSeats(createBookingDto.showtime, createBookingDto.seats);
    const booking = await this.bookingModel.create({
      user:createBookingDto.user,
      combo:createBookingDto.combo,
      showtime:createBookingDto.showtime,
      seats:createBookingDto.seats,
      totalPrice:createBookingDto.totalPrice,
      status:createBookingDto.status
    }) 
    return booking.save() ;
  }

 async findAll() {
    const findBooking = await this.bookingModel.find().populate({
      path: 'showtime',
      populate: {
        path: 'films', 
      },
    }).populate('combo.food').populate('user') 
    return findBooking;
  }

  findOne(id: number) {
    return `This action returns a #${id} booking`;
  }

  async update(id: string) {
    const updateStatus = await this.bookingModel.findOneAndUpdate(
        { _id: id },  // Chắc chắn tìm theo _id nếu id là ObjectId
        { status: 'paid' },
        { new: true }
    );

    if (!updateStatus) {
        return { message: "Không tìm thấy đơn hàng!" };
    }

    return { message: "Cập nhật thành công", data: updateStatus };
}
  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
