import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlimDto } from './dto/create-flim.dto';
import { UpdateFlimDto } from './dto/update-flim.dto';
import { Flim } from './schemas/flim.schema';
import { Model, ObjectId } from 'mongoose';
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
        throw new BadRequestException(`Flim ${createFlimDto.title} Exist`);
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
   * @param results
   * Step 1 : find all in database.
   * Step 2 : if not found throw new Error
   * Step 3 : return resuluts
   */
  async findAll() {
    const results = await this.flimModel
      .find()
      if (!results) {
        throw new Error('Movie not found');
      }
    return {results};
  }

  async findOne(id: string) {
    const flim = await this.flimModel.findById(id).exec();
    if (!flim) {
      throw new NotFoundException(`not found with ID: ${id}`);
    }
    return flim;
  }

  async update(id: string, updateFlimDto: UpdateFlimDto) {
    const updatedFlim = await this.flimModel.findByIdAndUpdate(id, updateFlimDto, { new: true }).exec();
    if (!updatedFlim) {
      throw new NotFoundException(`Không tìm thấy phim để cập nhật với ID: ${id}`);
    }
    return updatedFlim;
  }


  async remove(id: string) {
    const deletedFlim = await this.flimModel.findByIdAndDelete(id).exec();
    if (!deletedFlim) {
      throw new NotFoundException(`Not found with ID : ${id}`);
    }
    return { message: 'Deleted', deletedFlim };
  }

  async checkFlimexitst(title: string): Promise<boolean> {
    const flim = await this.flimModel.findOne({ title }).exec();
    return flim !== null;
  }
  
  
}
