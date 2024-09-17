import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";

@Schema()
export class Notification extends Document {
  @Prop()
  message: string;

  @Prop()
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'}) 
  userId: User;

}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
