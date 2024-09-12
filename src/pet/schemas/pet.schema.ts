import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";

@Schema({
    timestamps: true
})
export class Pet {
    @Prop() 
    petName: string;
    
    @Prop() 
    gender: string;

    @Prop() 
    breed: string;
    
    @Prop() 
    age: number;

    @Prop() 
    ownerName: string;

    @Prop() 
    ownerPhone: string;

    @Prop() 
    vaccinated: string;

    @Prop() 
    vaccinated_date: string;

    @Prop() 
    allergies: string;

    @Prop() 
    vetInfo: string;

    @Prop() 
    readyForBreeding: boolean;

    @Prop() 
    breedingPrice: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'}) 
    user: User;
}

export const PetSchema = SchemaFactory.createForClass(Pet)