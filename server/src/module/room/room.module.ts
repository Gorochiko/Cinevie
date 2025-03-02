import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TheaterModule } from '../theater/theater.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';
@Module({
  imports: [  MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]), // Kết nối MongoDB
  TheaterModule,],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
