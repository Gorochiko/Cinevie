import { Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Food } from './schemas/food.schema';
import { Model } from 'mongoose';

@Injectable()
export class FoodService {
  constructor(@InjectModel(Food.name)
  private foodModel : Model<Food>
 ){}
 async create(createFoodDto: CreateFoodDto): Promise<{ message: string | null }> {
     await this.foodModel.create({
      titleFood:createFoodDto.titleFood,
      price:createFoodDto.price,
      details:createFoodDto.details,
      imageFood:createFoodDto.imageFood
    })
    return {message:"Created food"}  
  }

  findAll() {
    return `This action returns all food`;
  }

  findOne(id: number) {
    return `This action returns a #${id} food`;
  }

  update(id: number, updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  remove(id: number) {
    return `This action removes a #${id} food`;
  }
}
