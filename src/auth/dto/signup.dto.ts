import { IsNotEmpty, IsString, IsNumber,IsBoolean, IsEmail } from 'class-validator';

export class SignUpDto {
     @IsNotEmpty()
     @IsString()
    readonly name: string;
    
    @IsNotEmpty()
    @IsEmail()
    readonly  email: string;

    @IsNotEmpty()
    @IsString()
    readonly  password: string;

}