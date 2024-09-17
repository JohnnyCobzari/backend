import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsEmpty, IsOptional,IsArray, ValidateNested} from "class-validator";
import { User } from "../../auth/schemas/user.schema";
import { Type } from 'class-transformer';
import { CreateVaccineDto } from './create-vaccine.dto';
export class UpdatePetDto {
  @IsOptional()
  @IsString()
  readonly petName: string;

  @IsOptional()
  @IsString()
  readonly gender: string;

  @IsOptional()
  @IsString()
  readonly breed: string;

  @IsOptional()
  @IsString()
  readonly age: string;

  @IsOptional()
  @IsString()
  readonly ownerName: string;

  @IsOptional()
  @IsString()
  readonly ownerPhone: string;

  @IsOptional()
  @IsString()
  readonly vaccinated: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVaccineDto)
  vaccines: CreateVaccineDto[];

  @IsOptional()
  @IsString()
  readonly allergies: string;
  
  @IsOptional()
  @IsString()
  readonly vetInfo: string;

  @IsOptional()
  @IsBoolean()
  readonly readyForBreeding: boolean;

  @IsOptional()
  @IsString()
  readonly breedingPrice: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsOptional()
  @IsNumber()
  readonly latitude: number;  // Added latitude field as a number

  @IsOptional()
  @IsNumber()
  readonly longitude: number; // Added longitude field as a number

  @IsEmpty({ message: "You cannot pass user id" })
  readonly userId: User;
}
