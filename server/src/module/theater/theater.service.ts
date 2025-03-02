import {  BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Theater } from './schemas/theater.schema';
import { Model } from 'mongoose';
@Injectable()
export class TheaterService {
  constructor(@InjectModel(Theater.name) 
  private theaterModel: Model<Theater>
) {}


/**
 * 
 * @param theaterData 
 * Step1: Kiểm tra xem rạp đã tồn tại chưa
 * Step2: Nếu rạp đã tồn tại thì throw BadRequestException
 * Step3: Tạo rạp mới và lưu vào database
 * Step4: Trả về rạp vừa tạo
 * @returns createdTheater
 */
async create(theaterData: CreateTheaterDto): Promise<Theater> {
  const existingTheater = await this.theaterModel.findOne({ name: theaterData.name }).exec();
  if (existingTheater) {
    throw new ConflictException(`Tên rạp '${theaterData.name}' đã tồn tại tại địa chỉ '${existingTheater.address}'`);
  }
  const createdTheater = await this.theaterModel.create({
          name: theaterData.name,
          address: theaterData.address,

  })
 return createdTheater;
}

async findAll(): Promise<Theater[]> {
  return this.theaterModel.find().populate('rooms').exec();
}

async findOne(id: string): Promise<Theater|null> {
  return this.theaterModel.findById(id).populate('rooms').exec();
}


/**
 * 
 * @param id 
 * @param updateData 
 * Step1: Kiểm tra xem rạp đã tồn tại chưa
 * Step2: Nếu rạp đã tồn tại thì throw BadRequestException  
 * Step3: Update rạp
 * Step4: Trả về rạp vừa update
 * @returns 
 */
async update(id: string, updateData: UpdateTheaterDto): Promise<Theater|null> {
  const existingTheater = await this.theaterModel.findOne({ name: updateData.name }).exec();
  if (existingTheater && existingTheater.id !== id) {
    throw new BadRequestException('Tên rạp đã tồn tại');
  }
  return this.theaterModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
}

async remove(id: string): Promise<Theater|null> {
  return this.theaterModel.findByIdAndDelete(id).exec();
}

}
