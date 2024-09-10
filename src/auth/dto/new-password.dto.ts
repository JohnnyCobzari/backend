import { IsString, IsNotEmpty } from 'class-validator';

export class NewPasswordDto {
  @IsString()
  @IsNotEmpty()
  passwordToken: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
