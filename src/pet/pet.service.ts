import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel} from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { Pet } from './schemas/pet.schema';
import { User } from '../auth/schemas/user.schema';
import { Match } from './schemas/match.schema';
import { MatchDto } from './dto/match.dto';

@Injectable()
export class PetService {
    constructor(
        @InjectModel(Pet.name)
        private petModel: mongoose.Model<Pet>,
        @InjectModel(Match.name) private matchModel: mongoose.Model<Match>,
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

        // Function to get all match requests where receiverPetId is the userId and status is false
  async getPendingRequestsByReceiver(userId: string): Promise<Match[]> {
    const pendingRequests = await this.matchModel.find({
      receiverPetId: userId,
      status: false,
    });

    return pendingRequests;
  }

  // Function to check if userId is either senderPetId or receiverPetId with status true
  async checkApprovedMatchesByUser(userId: string): Promise<Match[]> {
    const approvedMatches = await this.matchModel.find({
      $or: [
        { senderPetId: userId, status: true },
        { receiverPetId: userId, status: true },
      ],
    });

    return approvedMatches;
  }

      async createMatch(createMatchDto: MatchDto): Promise<Match> {
        const newMatch = new this.matchModel({
          ...createMatchDto,
          status: false, // Status set to false by default
        });
    
        return await newMatch.save();
      }
      async approveMatch(matchId: string): Promise<Match> {
        const match = await this.matchModel.findById(matchId);
    
        if (!match) {
          throw new NotFoundException('Match not found');
        }
    
        // Update the match status to true
        match.status = true;
    
        return await match.save();
      }

      async rejectMatch(matchId: string): Promise<void> {
        const match = await this.matchModel.findById(matchId);
    
        if (!match) {
          throw new NotFoundException('Match not found');
        }
    
        // Delete the match
        await this.matchModel.findByIdAndDelete(matchId);
      }

}
