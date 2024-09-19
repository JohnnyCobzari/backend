import { IsString, IsEmail, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateLocalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  docImage?: string;

  @IsOptional()
  @IsString()
  hisImage?: string;

  @IsOptional()
  @IsEnum(Role, { each: true })
  role?: Role[];
}
