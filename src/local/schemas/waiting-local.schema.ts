import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Schema({
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  })
  export class WaitingAddLocal extends Document{
    
  @Prop({ required: true })
  localType: string;

  @Prop({ required: true })
  localName: string;

  @Prop({ required: true })
  localInfo: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  latitude: number;


  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'}) 
  userId: User;
}

export const WaitingAddLocalSchema = SchemaFactory.createForClass(WaitingAddLocal);
