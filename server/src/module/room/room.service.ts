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
    
    const generatedSeats = roomData.seats || this.generateSeats(roomData.capacity);
    const newRoom = new this.roomModel({
      name: roomData.name,
      capacity: roomData.capacity,
      screenType: roomData.screenType || '2D', 
      seats: generatedSeats.map(seat => ({ seatNumber: seat, status: 'available' })),
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


  
  public generateSeats(capacity: number): string[] {
    const seats: string[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];
    let seatCount = 0;
    for (let row of rows) {
      for (let i = 1; i <= 10 && seatCount < capacity; i++) {
        seats.push(`${row}${i}`);
        seatCount++;
      }
    }
    return seats;
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
