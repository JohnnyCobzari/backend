import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsEmpty, IsOptional } from "class-validator";
import { User } from "../../auth/schemas/user.schema";

export class CreatePetDto {
  @IsNotEmpty()
  @IsString()
  readonly petName: string;

  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @IsNotEmpty()
  @IsString()
  readonly breed: string;

  @IsNotEmpty()
  @IsString() // Age is kept as a string (e.g., "2 years")
  readonly age: string;

  @IsNotEmpty()
  @IsString()
  readonly ownerName: string;

  @IsNotEmpty()
  @IsString()
  readonly ownerPhone: string;

  @IsNotEmpty()
  @IsString()
  readonly vaccinated: string;

  @IsOptional()
  @IsString()
  readonly vaccinated_date: string;

  @IsOptional()
  @IsString()
  readonly allergies: string;

  @IsNotEmpty()
  @IsString()
  readonly vetInfo: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly readyForBreeding: boolean;

  @IsOptional()
  @IsString()
  readonly breedingPrice: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsNumber()
  readonly latitude: number;  // Added latitude field as a number

  @IsNotEmpty()
  @IsNumber()
  readonly longitude: number; // Added longitude field as a number

  @IsEmpty({ message: "You cannot pass user id" })
  readonly userId: User;
}
