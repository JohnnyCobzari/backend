import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";

@Schema({
    timestamps: true
})
export class Pet {
    @Prop() 
    name: string;
    
    @Prop() 
    gender: string;

    @Prop() 
    breed: string;
    
    @Prop() 
    age: number;

    @Prop() 
    owner_name: string;

    @Prop() 
    phone_number: string;

    @Prop() 
    vaccinated: boolean;

    @Prop() 
    vaccinated_date: string;

    @Prop() 
    alergies: string;

    @Prop() 
    veterinar: string;

    @Prop() 
    ready: boolean;

    @Prop() 
    breed_price: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'}) 
    user: User;
}

export const PetSchema = SchemaFactory.createForClass(Pet)