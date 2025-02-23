import { IsString, IsDate, IsNumber, IsNotEmpty } from "class-validator";


export class CreateFlimDto {
    
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsNumber()
    age: number

    @IsNotEmpty()
    @IsNumber()
    timeLength:number

    @IsNotEmpty()
    @IsNumber()
    year:number
    
    @IsNotEmpty()
    @IsDate()
    onStage:Date

    @IsNotEmpty()
    @IsString()
    desciption:string

    @IsNotEmpty()
    @IsString()
    image:string
}
