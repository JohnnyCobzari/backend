import { IsNotEmpty, IsString, IsNumber,IsBoolean, IsEmail, IsOptional } from 'class-validator';

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

    @IsOptional()
    readonly role: string[];
}