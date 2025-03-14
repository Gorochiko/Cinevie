import { Module } from '@nestjs/common';
import { FlimsService } from './flims.service';
import { FlimsController } from './flims.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Flim, FlimSchema } from './schemas/flim.schema';
@Module({
   imports: [MongooseModule.forFeature([{ name: Flim.name, schema: FlimSchema }])],
  controllers: [FlimsController],
  providers: [FlimsService],
  exports: [FlimsService],
})
export class FlimsModule {}
