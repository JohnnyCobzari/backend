import { IsNotEmpty, IsString, IsNumber, IsMongoId, Max, Min, IsOptional } from 'class-validator';

export class CreateReviewDto {
  @IsMongoId()
  @IsOptional()
  userId: string; // Reference to the User ID who wrote the review

  @IsMongoId()
  @IsOptional()
  localId: string; // Reference to the AddLocal ID being reviewed

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating: number; // Rating given by the user

  @IsString()
  @IsOptional()
  reviewMessage: string; // Review text/message
}
