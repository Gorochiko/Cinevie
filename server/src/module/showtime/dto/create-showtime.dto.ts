import { Type } from "class-transformer";
import { IsString,  IsNotEmpty, IsMongoId,  } from "class-validator";
import { Types } from "mongoose";

export class CreateShowtimeDto {
@IsNotEmpty()
@IsMongoId()
films: string;

@IsNotEmpty()
@IsMongoId()
theater: string;

@IsNotEmpty()
rooms: string

@IsNotEmpty()
dateAction: Date;

@IsNotEmpty()
price:number;

@IsString()
@IsNotEmpty()
startTime: Date;

@IsString()
@IsNotEmpty()
endTime: Date;
}
