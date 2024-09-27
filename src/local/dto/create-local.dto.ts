import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional, IsLongitude, IsLatitude, IsMongoId } from 'class-validator';

export class AddLocalDto {
  @IsNotEmpty()
  @IsString()
  localType: string;

  @IsNotEmpty()
  @IsString()
  localName: string;

  @IsNotEmpty()
  @IsString()
  localInfo: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
