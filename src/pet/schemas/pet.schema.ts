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
    age: string;

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
    breedingPrice: string;

    @Prop() 
    image: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'}) 
    userId: User;
}

export const PetSchema = SchemaFactory.createForClass(Pet)