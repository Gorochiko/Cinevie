import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFlimDto } from './dto/create-flim.dto';
import { UpdateFlimDto } from './dto/update-flim.dto';
import { Flim } from './schemas/flim.schema';
import { Model } from 'mongoose';
import aqp from 'api-query-params';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class FlimsService {
  constructor(@InjectModel(Flim.name) private flimModel : Model<Flim> ){}

  /**
   * @param createFlimDto
   * step 1: checkFlim if exitst throw BadRequestException
   * step 2: create new flim 
   * step 3: return create Flim
   */
 async create(createFlimDto: CreateFlimDto) {
    try {
      const checkFlim = await this.checkFlimexitst(createFlimDto.title);
      if(checkFlim){
        throw new BadRequestException("Flim Exist");
      }
      
      const createFlim = await this.flimModel.create({
        title:createFlimDto.title,
        age: createFlimDto.age,
        timeLength:createFlimDto.timeLength,
        year: createFlimDto.year,
        onStage:createFlimDto.onStage,
        description:createFlimDto.description,
        image:createFlimDto.image,
      })
      return createFlim;
    } catch (error) {
      throw new Error(error.message);
    }
  }

/**
   * Find all users with pagination.
   *
   * @param page - The page number to retrieve.
   * @param limitPage - The number of users per page.
   * Promise User[] or undefined total and totalPage
   * Step 1: validate page<=0 and limitPage<=0
   * Step 2: skip Calculate the number of documents to skip based on the current number of pages and the number of documents per page.
   * Step 3: Find all User with Pagination and select filed core
   * Step 4: countDocuments is total user
   * Step 5: Math ceil totalPage
   * Step 6: return users and total and totalPage
   * @returns result, metadata
   */
  
  async findAll() {
 
    //Đếm tổng số lượng bản ghi
   

    const results = await this.flimModel
      .find()
      if (!results) {
        throw new Error('Movie not found');
      }
    return { 
      results
      };
  }

  findOne(id: number) {
    return `This action returns a #${id} flim`;
  }

  update(id: number, updateFlimDto: UpdateFlimDto) {
    return `This action updates a #${id} flim`;
  }

  remove(id: number) {
    return `This action removes a #${id} flim`;
  }




  async checkFlimexitst(title: string): Promise<boolean> {
    const flim = await this.flimModel.findOne({ title }).exec();
    return flim !== null;
  }
  
  
}
