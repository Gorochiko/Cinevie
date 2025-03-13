import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Room } from './schemas/room.schema';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
 
) {}



/** Lời hứa trả vè Kiểu Room Object
 * @param roomData  
 * Step 1 : genarateSeat with capacity value
 * Step 2 : add new room 
 * Step 3 : Save
 * @returns newRoom
 */

  async createRoom(roomData: CreateRoomDto): Promise<Room> {

    const newRoom = new this.roomModel({
      name: roomData.name,
      capacity: roomData.capacity,
      screenType: roomData.screenType || '2D', 
      isActive: true,
    });
    return newRoom.save();
  }

  // async checkExitstName(Roomname: string, roomData: CreateRoomDto) {
  //   const nameExitst = await this.roomModel.findOne({ name: roomData.name }).exec();
  //   if (nameExitst && nameExitst.name === Roomname) {
  //     throw new ConflictException("phòng đã đã tồn tại");
  //   }
  //   return nameExitst;
  // }




  async findAll(): Promise<Room[]> {
    return this.roomModel.find().populate('theater').exec();
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id).exec();
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
