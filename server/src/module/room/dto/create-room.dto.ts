import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";


export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    theater: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    seats?: string[];
}
