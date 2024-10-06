import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";


@Schema({
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  })
@Schema()
export class LocalNotification extends Document {
  @Prop()
  announcement: string;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'}) 
  userId: User;

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

}

export const LocalNotificationSchema = SchemaFactory.createForClass(LocalNotification);
