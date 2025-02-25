import { BadRequestException, Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} flim`;
  }

  update(id: string, updateFlimDto: UpdateFlimDto) {
    const results = this.flimModel.findByIdAndUpdate(id, updateFlimDto);
    return results;
  }

  remove(_id: string) {
    const results = this.flimModel.findByIdAndDelete({_id:_id})
    return results ;
  }




  async checkFlimexitst(title: string): Promise<boolean> {
    const flim = await this.flimModel.findOne({ title }).exec();
    return flim !== null;
  }
  
  
}
