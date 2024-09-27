import { IsString, IsEmail, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateLocalDto {
  @IsNotEmpty()
  @IsString()
  companyDirector: string; // Matches your front-end's "companyDirector"

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  documentImageUrl?: string; // Matches your front-end's "documentImageUrl"

  @IsOptional()
  @IsString()
  userPhotoUrls?: string[]; // Adjusted to match the front-end's "userPhotoUrls" as an array

  @IsOptional()
  @IsEnum(Role)
  role?: Role; // Adjusted to a single role, as your form sends "local"
}
