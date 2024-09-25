import { IsMongoId, IsBoolean, IsNotEmpty } from 'class-validator';

export class MatchDto {
  
  @IsMongoId()
  @IsNotEmpty()
  senderPetId: string;

  @IsMongoId()
  @IsNotEmpty()
  receiverPetId: string;
}
