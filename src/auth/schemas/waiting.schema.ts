import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

@Schema()
export class WaitingLocal extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  docImage?: string;

  @Prop()
  hisImage?: string;

  @Prop({ type: [String], enum: Role })
  role?: Role[];

  @Prop({ default: 'pending' })
  status: 'pending' | 'approved' | 'rejected';
}

export const WaitingUserSchema = SchemaFactory.createForClass(WaitingLocal);
