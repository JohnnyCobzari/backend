import { IsMongoId, IsBoolean, IsNotEmpty } from 'class-validator';

export class MatchDto {
  
  @IsMongoId()
  @IsNotEmpty()
  senderPetId: string;

  @IsMongoId()
  @IsNotEmpty()
  receiverPetId: string;
 // True for a match, false for a rejection or unmatched
}
