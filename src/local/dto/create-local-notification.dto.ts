import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsMongoId } from 'class-validator';

export class CreateLocalNotificationDto {
  
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date) 
  createdAt: Date;

  @IsMongoId()
  @IsNotEmpty()
  userId: string; // Use string here since it's an ObjectId reference.
}
