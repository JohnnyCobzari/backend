import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsMongoId } from 'class-validator';

export class CreateLocalNotificationDto {
  
  @IsString()
  @IsNotEmpty()
  announcement: string;

  @IsMongoId()
  @IsNotEmpty()
  userId: string; // Use string here since it's an ObjectId reference.
}
