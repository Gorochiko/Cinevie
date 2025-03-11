import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';
import { Showtime } from './schemas/showtime.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FlimsService } from '../flims/flims.service';
import { Model } from 'mongoose';
import { TheaterService } from '../theater/theater.service';
import { RoomService } from '../room/room.service';
@Injectable()
export class ShowtimeService {
  constructor(@InjectModel(Showtime.name)
  private showtimeModel: Model<Showtime>,
    private roomService: RoomService,
    private flimService: FlimsService,
    private theaterService : TheaterService
  ) { }



  /**
   * @param createShowtimeDto 
   * step 1: check room if not found throw NotFoundException
   * step 2: check flim if not found throw NotFoundException
   * step 3: create new showtime
   * step 4: return createdShowtime
   * @returns 
   */
  async create(createShowtimeDto: CreateShowtimeDto):Promise<{message:string}> {
 
    if(!createShowtimeDto.price){
      throw new ConflictException('Giá tiền không được để trống')
    }
    const theater = await this.theaterService.findTheaterByID(createShowtimeDto.theater);
    if(!theater){
      throw new NotFoundException('Theater not found')
    }
    const room = await this.roomService.findOne(createShowtimeDto.rooms);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    const flim = await this.flimService.findOne(createShowtimeDto.films);
    if (!flim) {
      throw new NotFoundException('Flim not found');
    }
    await this.showtimeModel.create(
      {
        films: createShowtimeDto.films,
        theater:createShowtimeDto.theater,
        rooms: createShowtimeDto.rooms,
        price:createShowtimeDto.price,
        dateAction: createShowtimeDto.dateAction,
        startTime: createShowtimeDto.startTime,
        endTime: createShowtimeDto.endTime,
      }
    );
    return {message:"Created showtime"};
  }


  
  /**
   * @returns 
   * Step 1 : find all in database.
   * Step 2 : if not found throw new Error
   * Step 3 : return resuluts
   */
  async findAll() {
    return this.showtimeModel.find().populate('rooms').populate('films').populate('theater').exec();
  }


  /**
   * 
   * @param id 
   * 
   * Step 1 : find by id in database.
   * Step 2 : if not found throw new Error
   * Step 3 : return resuluts
   * 
   * @returns 
   */
  async findOne(id: string) {
    const showtime = await this.showtimeModel.findById(id).populate('room').populate('films').exec();
    if (!showtime) {
      throw new NotFoundException('Showtime not found');
    }
    return showtime;
  }





  
  /**
   * 
   * @param id 
   * @param updateShowtimeDto
   * Step 1 : find by id in database.
   * Step 2 : if not found throw new Error
   * Step 3 : return resuluts 
   * @returns 
   */
   async update(id: string, updateShowtimeDto: UpdateShowtimeDto) {
    const updatedShowtime = await this.showtimeModel.findByIdAndUpdate(id, updateShowtimeDto, { new: true }).exec();
    if (!updatedShowtime) {
      throw new NotFoundException('Showtime not found');
    }
    return updatedShowtime;
  }




  /**
   * 
   * @param id 
   * Step 1 : find by id in database.
   * Step 2 : if not found throw new Error
   * Step 3 : return resuluts
   * 
   * @returns deletedShowtime
   */
  async remove(id: string) {
    const deletedShowtime = await this.showtimeModel.findByIdAndDelete(id).exec();
    if (!deletedShowtime) {
      throw new NotFoundException('Showtime not found');
    }
    return deletedShowtime;
  }
}
