import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from '../enums/role.enum';

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class Local extends Document {
  @Prop()
  name: string;

  @Prop({
    unique: [true, 'Duplicate email entered'],
  })
  email: string;

  @Prop()
  password: string;

  @Prop()
  docImage: string;

  @Prop()
  hisImage: string;

  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.User],
  })
  role: Role[];

}

export const LocalSchema = SchemaFactory.createForClass(Local);
