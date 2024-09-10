import { IsOptional, IsString, IsNumber,IsBoolean, IsEmpty } from "class-validator";
import { User } from "src/auth/schemas/user.schema";

export class UpdatePetDto {
     @IsOptional()
     @IsString()
    readonly name: string;
    
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
    readonly  owner_name: string;

    @IsOptional()
    @IsString()
    readonly phone_number: string;

    @IsOptional()
    @IsBoolean()
    readonly vaccinated: boolean;

    @IsOptional()
    @IsString()
    readonly vaccinated_date: string;

    @IsOptional()
    @IsString()
    readonly alergies: string;

    @IsOptional()
    @IsString()
    readonly veterinar: string;

    @IsOptional()
    @IsBoolean()
    readonly ready: boolean;

    @IsOptional()
    @IsNumber()
    readonly breed_price: number;

    @IsEmpty({ message: "You cannot pass user id"})
    readonly user: User;
}