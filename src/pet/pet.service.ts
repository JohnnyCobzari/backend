import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel} from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { Pet } from './schemas/pet.schema';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class PetService {
    constructor(
        @InjectModel(Pet.name)
        private petModel: mongoose.Model<Pet>
    ) {}

    async findAll(): Promise<Pet []> {
       const pets = await this.petModel.find()
       return pets
    }

    async create(pet: Pet, user: User): Promise<Pet> {
        const data = Object.assign(pet, {userId: user._id})
        const res = await this.petModel.create(data)
        return res
    }

    async findById(id: string): Promise<Pet> {
        const isValidId = mongoose.isValidObjectId(id);
        if(!isValidId) {
            throw new BadRequestException('Please enter correct id');
        }
        const pet = await this.petModel.findById(id);
        if(!pet) {
            throw new NotFoundException('Pet not found');
        }
        return pet;
     }

    
    async updateById(id: string, pet: Pet): Promise<Pet> {
        return  await this.petModel.findByIdAndUpdate(id, pet, {
            new:true,
            runValidators: true,
        });
        
     }

     async deleteById(id: string): Promise<Pet> {
        return  await this.petModel.findByIdAndDelete(id);
        
     }
     async findPetsByUser(userId: string): Promise<Pet[]> {
        return this.petModel.find({ userId: userId }).exec();
      }

}
