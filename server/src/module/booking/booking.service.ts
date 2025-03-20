import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Booking } from './schemas/booking.schema';
import { ShowtimeService } from '../showtime/showtime.service';

import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from '../user/user.service';
import { FoodService } from '../food/food.service';
import { FlimsService } from '../flims/flims.service';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name)
  private bookingModel: Model<Booking>,
    private showtimeService: ShowtimeService,
    private readonly mailerService: MailerService,
    private userService: UserService,
    private foodService: FoodService,
    private filmsService: FlimsService
  ) { }

  async create(createBookingDto: CreateBookingDto) {
    const showtime = await this.showtimeService.findOne(createBookingDto.showtime)
    const checkSeats = createBookingDto.seats.filter(seatNumber => {
      const seat = showtime.seats.find(s => s.seatNumber === seatNumber);
      return !seat || seat.status !== 'available';
    });
    if (checkSeats.length > 0) {
      throw new ConflictException(`Seats ${checkSeats.join(' , ')} are already booked or not available`);
    }
    await this.showtimeService.bookSeats(createBookingDto.showtime, createBookingDto.seats);
    const booking = await this.bookingModel.create({
      user: createBookingDto.user,
      combo: createBookingDto.combo,
      showtime: createBookingDto.showtime,
      seats: createBookingDto.seats,
      totalPrice: createBookingDto.totalPrice,
      status: createBookingDto.status
    })
    return booking.save();
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
      { _id: id },
      { status: 'paid' },
      { new: true }
    ).populate({
      path: 'showtime',
      populate: { path: 'films', select: 'title' }
    }).populate('combo.food').populate({
      path: 'user',
      select: 'email firstName lastName',
    });

    if (!updateStatus) {
      return { message: "Không tìm thấy đơn hàng!" };
    }
    const findShowtime = await this.showtimeService.findOne(updateStatus.showtime._id.toString());
    const findUser = await this.userService.findUserByID(updateStatus.user._id.toString())
    const findFilms = await this.filmsService.findOne(findShowtime?.films?._id.toString())

    try {
      await this.mailerService.sendMail({
        to: findUser?.email,
        subject: 'Xác nhận đặt vé xem phim',
        template: 'ticket',
        context: {
          name: `${findUser?.firstName} ${findUser?.lastName}` ,
          movie: findFilms?.title,
          date: findShowtime.dateAction instanceof Date ? findShowtime.dateAction.toLocaleDateString() : "N/A",
          time: findShowtime.startTime instanceof Date ? findShowtime.startTime.toLocaleTimeString() : "N/A",
          seats: updateStatus.seats ? updateStatus.seats.join(', ') : "N/A",
          price: updateStatus.totalPrice || 0,
        },
      });

      return { message: "Cập nhật thành công, email xác nhận đã được gửi!", data: updateStatus };
    } catch (error) {
          throw new error
    }

  }

















  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
