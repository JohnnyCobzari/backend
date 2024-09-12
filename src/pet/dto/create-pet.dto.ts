import { IsNotEmpty, IsString, IsNumber,IsBoolean, IsEmpty,IsOptional } from "class-validator";
import { User } from "../../auth/schemas/user.schema";

export class CreatePetDto {
     @IsNotEmpty()
     @IsString()
    readonly petName: string;
    
    @IsNotEmpty()
    @IsString()
    readonly  gender: string;

    @IsNotEmpty()
    @IsString()
    readonly  breed: string;
    
    @IsNotEmpty()
    @IsString()
    readonly age: string;

    @IsNotEmpty()
    @IsString()
    readonly  ownerName: string;

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
   
    @IsEmpty({ message: "You cannot pass user id"})
    readonly userId: User;
}