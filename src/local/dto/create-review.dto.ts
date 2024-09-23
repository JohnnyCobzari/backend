import { IsNotEmpty, IsString, IsNumber, IsMongoId, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: string; // Reference to the User ID who wrote the review

  @IsMongoId()
  @IsNotEmpty()
  localId: string; // Reference to the AddLocal ID being reviewed

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  rating: number; // Rating given by the user

  @IsString()
  @IsNotEmpty()
  reviewMessage: string; // Review text/message
}
