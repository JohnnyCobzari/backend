import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, IsLongitude, IsLatitude, IsMongoId } from 'class-validator';

export class AddLocalDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  information: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsString()
  profileImage: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
