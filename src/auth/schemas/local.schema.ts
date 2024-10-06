import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from '../enums/role.enum';

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class Local extends Document {
  @Prop({ required: true })
  companyDirector: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  documentImageUrl?: string;

  @Prop()
  userPhotoUrls?: string[];

  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.User],
  })
  role: Role[];

}

export const LocalSchema = SchemaFactory.createForClass(Local);
