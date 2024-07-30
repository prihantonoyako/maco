import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Matches } from "./../../common/decorators/match-decorator";

export class RegisterDTO {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @Matches('password', { message: 'Passwords do not match' })
    confirmedPassword: string;
}