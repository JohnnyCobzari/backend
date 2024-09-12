import { IsNotEmpty, IsString, IsNumber,IsBoolean, IsEmpty } from "class-validator";
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
    @IsNumber()
    readonly age: number;

    @IsNotEmpty()
    @IsString()
    readonly  ownerName: string;

    @IsNotEmpty()
    @IsString()
    readonly ownerPhone: string;

    @IsNotEmpty()
    @IsString()
    readonly vaccinated: string;

    @IsNotEmpty()
    @IsString()
    readonly vaccinated_date: string;

    @IsNotEmpty()
    @IsString()
    readonly allergies: string;

    @IsNotEmpty()
    @IsString()
    readonly vetInfo: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly readyForBreeding: boolean;

    @IsNotEmpty()
    @IsNumber()
    readonly breedingPrice: number;
   
    @IsEmpty({ message: "You cannot pass user id"})
    readonly user: User;
}