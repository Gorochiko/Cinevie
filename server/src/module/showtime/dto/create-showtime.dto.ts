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

@IsString()
@IsNotEmpty()
startTime: string;

@IsString()
@IsNotEmpty()
endTime: string;
}
