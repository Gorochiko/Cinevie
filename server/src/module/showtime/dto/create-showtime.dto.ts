
import { IsString,  IsNotEmpty, IsMongoId, IsOptional,  } from "class-validator";

export class CreateShowtimeDto {
@IsNotEmpty()
@IsMongoId()
films: string;

@IsNotEmpty()
@IsMongoId()
theater: string;

@IsString()
@IsNotEmpty()
rooms: string

@IsNotEmpty()
dateAction: Date;

@IsString()
@IsNotEmpty()
price:string;

@IsString()
@IsNotEmpty()
startTime: Date;

@IsString()
@IsNotEmpty()
endTime: Date;


@IsOptional()
status:string
}
