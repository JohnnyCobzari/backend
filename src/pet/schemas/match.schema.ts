import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema'; // Adjust the path to your User schema
import { Pet } from './pet.schema'; // Adjust the path to your Pet schema

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class Match extends Document {
  
 

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true })
  senderPetId: Pet;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true })
  receiverPetId: Pet;

  @Prop({ required: true })
  status: boolean; // True for a match, false for a rejection or unmatched
}

export const MatchSchema = SchemaFactory.createForClass(Match);
