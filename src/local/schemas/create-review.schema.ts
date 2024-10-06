import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema'; // Adjust the path accordingly
import { AddLocal } from './create-local.schema'; // Adjust the path accordingly

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class Review extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
  userId: string; // Reference to the User ID who wrote the review

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: AddLocal.name, required: true })
  localId: string; // Reference to the AddLocal ID being reviewed

  @Prop({ required: true, min: 1, max: 5 }) // Assuming rating is between 1 and 5
  rating: number; // Rating given by the user

  @Prop({ required: true })
  reviewMessage: string; // Review text/message

  @Prop({ default: Date.now })
  createdAt: Date; // Date when the review was created
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
