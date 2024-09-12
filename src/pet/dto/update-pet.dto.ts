import { IsOptional, IsString, IsNumber,IsBoolean, IsEmpty } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class UpdatePetDto {
     @IsOptional()
     @IsString()
    readonly petName: string;
    
    @IsOptional()
    @IsString()
    readonly  gender: string;

    @IsOptional()
    @IsString()
    readonly  breed: string;
    
    @IsOptional()
    @IsNumber()
    readonly age: number;

    @IsOptional()
    @IsString()
    readonly  ownerName: string;

    @IsOptional()
    @IsString()
    readonly ownerPhone: string;

    @IsOptional()
    @IsString()
    readonly vaccinated: string;

    @IsOptional()
    @IsString()
    readonly vaccinated_date: string;

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
    @IsNumber()
    readonly breedingPrice: number;

    @IsEmpty({ message: "You cannot pass user id"})
    readonly user: User;
}