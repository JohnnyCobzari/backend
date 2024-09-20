import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  })
  export class AddLocal extends Document{
    
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  information: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  profileImage: string;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const AddLocalSchema = SchemaFactory.createForClass(AddLocal);
