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
 * Creates a new film.
 * @param {CreateFlimDto} createFlimDto - Data to create the film.
 * @returns {Promise<Flim>} - The newly created film.
 * @throws {BadRequestException} - If a film with the same title already exists.
 * @throws {Error} - If an unexpected error occurs.
 * 
 * Steps:
 * 1. Checks if a film with the same title already exists.
 * 2. If the film exists, throws a BadRequestException.
 * 3. Creates a new film with the provided data.
 * 4. Returns the created film.
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
 * Retrieves all films from the database.
 * @returns {Promise<{ results: Flim[] }>} - List of all films.
 * @throws {Error} - If no films are found.
 * 
 * Steps:
 * 1. Finds all films in the database.
 * 2. If no films are found, throws an error.
 * 3. Returns the list of films.
 */
    async findAll() {
      const results = await this.flimModel
        .find()
        if (!results) {
          throw new Error('Movie not found');
        }
      return {results};
    }




    /**
 * Finds a film by its ID.
 * @param {string} id - The ID of the film to find.
 * @returns {Promise<Flim>} - The found film.
 * @throws {NotFoundException} - If the film is not found.
 * 
 * Steps:
 * 1. Finds the film by ID in the database.
 * 2. If the film is not found, throws a NotFoundException.
 * 3. Returns the film.
 */
    async findOne(id: string) {
      const flim = await this.flimModel.findById(id).exec();
      if (!flim) {
        throw new NotFoundException(`not found with ID: ${id}`);
      }
      return flim;
    }







    /**
 * Updates a film by its ID.
 * @param {string} id - The ID of the film to update.
 * @param {UpdateFlimDto} updateFilmDto - Data to update the film.
 * @returns {Promise<Flim>} - The updated film.
 * @throws {NotFoundException} - If the film is not found.
 * 
 * Steps:
 * 1. Finds the film by ID and updates it with the provided data.
 * 2. If the film is not found, throws a NotFoundException.
 * 3. Returns the updated film.
 */
    async update(id: string, updateFilmDto: UpdateFlimDto) {
      const updatedFilm = await this.flimModel.findByIdAndUpdate(
          id,
          updateFilmDto,
          { new: true }
      ).exec();

      if (!updatedFilm) {
          throw new NotFoundException(`Không tìm thấy phim để cập nhật với id: ${id}`);
      }
      return updatedFilm;
  }











  /**
 * Deletes a film by its ID.
 * @param {string} id - The ID of the film to delete.
 * @returns {Promise<{ message: string, deletedFlim: Flim }>} - A success message and the deleted film.
 * @throws {NotFoundException} - If the film is not found.
 * 
 * Steps:
 * 1. Finds the film by ID and deletes it.
 * 2. If the film is not found, throws a NotFoundException.
 * 3. Returns a success message and the deleted film.
 */
    async remove(id: string) {
      const deletedFlim = await this.flimModel.findByIdAndDelete(id).exec();
      if (!deletedFlim) {
        throw new NotFoundException(`Not found with ID : ${id}`);
      }
      return { message: 'Deleted', deletedFlim };
    }








    /**
 * Checks if a film with the given title already exists.
 * @param {string} title - The title of the film to check.
 * @returns {Promise<boolean>} - True if the film exists, otherwise false.
 * 
 * Steps:
 * 1. Finds a film with the provided title in the database.
 * 2. Returns true if the film exists, otherwise false.
 */
    async checkFlimexitst(title: string): Promise<boolean> {
      const flim = await this.flimModel.findOne({ title }).exec();
      return flim !== null;
    }
    
    
  }
