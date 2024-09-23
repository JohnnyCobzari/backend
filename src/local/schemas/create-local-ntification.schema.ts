import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";

@Schema()
export class LocalNotification extends Document {
  @Prop()
  message: string;

  @Prop()
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'}) 
  userId: User;

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

}

export const LocalNotificationSchema = SchemaFactory.createForClass(LocalNotification);
