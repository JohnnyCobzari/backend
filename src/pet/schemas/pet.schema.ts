import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";

@Schema()
class Vaccine {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    dateAdministered: Date;
}
const VaccineSchema = SchemaFactory.createForClass(Vaccine);
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

    @Prop({ type: [VaccineSchema], default: [] }) 
    vaccines: Vaccine[];

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

    @Prop() 
    longitude: number;

    @Prop() 
    latitude: number;
}

export const PetSchema = SchemaFactory.createForClass(Pet)