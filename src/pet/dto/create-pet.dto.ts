import { IsNotEmpty, IsString, IsNumber,IsBoolean, IsEmpty } from "class-validator";
import { User } from "../../auth/schemas/user.schema";

export class CreatePetDto {
     @IsNotEmpty()
     @IsString()
    readonly name: string;
    
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
    readonly  owner_name: string;

    @IsNotEmpty()
    @IsString()
    readonly phone_number: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly vaccinated: boolean;

    @IsNotEmpty()
    @IsString()
    readonly vaccinated_date: string;

    @IsNotEmpty()
    @IsString()
    readonly alergies: string;

    @IsNotEmpty()
    @IsString()
    readonly veterinar: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly ready: boolean;

    @IsNotEmpty()
    @IsNumber()
    readonly breed_price: number;
   
    @IsEmpty({ message: "You cannot pass user id"})
    readonly user: User;
}