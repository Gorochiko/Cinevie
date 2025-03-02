import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { FlimsService } from './flims.service';
import { CreateFlimDto } from './dto/create-flim.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';
import { UpdateFlimDto } from './dto/update-flim.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
@Controller('films')
export class FlimsController {
  constructor(private readonly flimsService: FlimsService) { }

    @Post('add-films')
    @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
        const ext = extname(file.originalname);
        callback(null, uniqueSuffix);
      },
    }),
  }))
  async create(
    @Body() createFilmDto: CreateFlimDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }


    createFilmDto.image = `/uploads/${file.filename}`;
    return this.flimsService.create(createFilmDto);
  }

  @Get('getFilms')
  async findAll() {
    return this.flimsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flimsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlimDto: UpdateFlimDto) {
    return this.flimsService.update(id, updateFlimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flimsService.remove(id);
  }
}
