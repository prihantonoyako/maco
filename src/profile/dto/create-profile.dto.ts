import { IsArray, IsDate, IsDateString, IsIn, isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateProfileDTO {
    @IsString()
    @IsNotEmpty()
    display_name: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['Male', 'Female'], {
        message: 'Gender must be either Male or Female',
    })
    gender: string;
    
    @IsString()
    @IsNotEmpty()
    @IsDateString()
    birthday: string;

    @IsNumber()
    height: number;

    @IsNumber()
    weight: number;

    @IsArray()
    @IsString({each: true})
    interest: string[];
}