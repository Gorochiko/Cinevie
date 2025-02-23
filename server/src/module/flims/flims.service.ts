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
        description:createFlimDto.desciption,
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
  
  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    //bỏ các tham số không cần thiết
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;
    //Gán giá trị mặc định nếu current hoặc pageSize không được truyền
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;
    //Đếm tổng số lượng bản ghi
    const totalItems = await this.flimModel.countDocuments(filter);
    //Tính toán tổng số trang
    const totalPage = Math.ceil(totalItems / pageSize);
    // Tính số bản ghi cần bỏ qua
    const skip = (current - 1) * pageSize;
    //Lấy các kết quả theo trang và sắp xếp
    const results = await this.flimModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any);
    return { 
      meta:{
        current:current,
        pageSize:pageSize,
        pages:totalPage,
        total:totalItems,
      },
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




  checkFlimexitst = async(title:string) =>
await this.flimModel.exists({title:title});
  
}
