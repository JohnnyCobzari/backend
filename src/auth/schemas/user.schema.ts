import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from '../enums/role.enum';

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt fields
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({
    unique: [true, 'Duplicate email entered'],
  })
  email: string;

  @Prop()
  password: string;

  @Prop()
  res: string;

  // Add the resetToken field to the schema
  @Prop()
  resetToken?: string;

  // Add the resetTokenExpiration field to the schema
  @Prop()
  resetTokenExpiration?: Date;

  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.User],
  })
  role: Role[];

}

export const UserSchema = SchemaFactory.createForClass(User);
