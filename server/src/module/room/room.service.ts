import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';
import { TheaterService } from '../theater/theater.service';
@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>,private theaterService: TheaterService,) {}
  async create(roomData: CreateRoomDto): Promise<Room> {
    const theater = await this.theaterService.findOne(roomData.theater);
    if (!theater) {
      throw new NotFoundException('Theater không tồn tại');
    }
    return this.roomModel.create(roomData);
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().populate('theater').exec();
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id).populate('theater').exec();
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }


  async update(id: string, updateData: UpdateRoomDto): Promise<Room> {
    const updatedRoom = await this.roomModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedRoom) {
      throw new NotFoundException('Room not found');
    }
    return updatedRoom;
  }

  async remove(id: string): Promise<Room> {
    const deletedRoom = await this.roomModel.findByIdAndDelete(id).exec();
    if (!deletedRoom) {
      throw new NotFoundException('Không tìm thấy phòng để xóa');
    }
    return deletedRoom;
  }
}
