import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FlimsService } from './flims.service';
import { CreateFlimDto } from './dto/create-flim.dto';
import { UpdateFlimDto } from './dto/update-flim.dto';

@Controller('flims')
export class FlimsController {
  constructor(private readonly flimsService: FlimsService) {}

  @Post()
  create(@Body() createFlimDto: CreateFlimDto) {
    return this.flimsService.create(createFlimDto);
  }

  @Get()
  async findAll(
    @Query('query') query: string = '',
    @Query('current') current: number = 1,
    @Query('pageSize') pageSize: number = 10
  ) {
    return this.flimsService.findAll(query, current, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flimsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlimDto: UpdateFlimDto) {
    return this.flimsService.update(+id, updateFlimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flimsService.remove(+id);
  }
}
