// create-vaccine.dto.ts
import { IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVaccineDto {
  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date) 
  dateAdministered: Date;
}
