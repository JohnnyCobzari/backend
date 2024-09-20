
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WaitingLocal } from '../auth/schemas/waiting.schema';
import { Local } from '../auth/schemas/local.schema'; // Assuming you have a User schema for the main database
import { WaitingAddLocal } from 'src/local/schemas/waiting-local.schema';
import { AddLocal } from 'src/local/schemas/create-local.schema';

@Injectable()
export class AdminService {

    constructor(
        @InjectModel(WaitingLocal.name) private waitingLocalModel: Model<WaitingLocal>,
        @InjectModel(Local.name) private localModel: Model<Local>,
        @InjectModel(WaitingAddLocal.name) private waitingAddLocalModel: Model<WaitingAddLocal>,
        @InjectModel(AddLocal.name) private addLocalModel: Model<AddLocal>,
      ) {}
    
    
      // Get all users from waiting list
      async getWaitingListUsers(): Promise<WaitingLocal[]> {
        return await this.waitingLocalModel.find({ status: 'pending' }).exec();
      }
    
      // Approve user
      async approveUser(id: string): Promise<Local> {
        const waitingUser = await this.waitingLocalModel.findById(id).exec();
        if (!waitingUser) {
          throw new NotFoundException('Local not found in waiting list');
        }
    
        // Move user to main user database
        const newUser = new this.localModel({
          name: waitingUser.name,
          email: waitingUser.email,
          password: waitingUser.password, // Password is already hashed
          docImage: waitingUser.docImage,
          hisImage: waitingUser.hisImage,
          role: waitingUser.role,
        });
    
        await newUser.save();
        
        // Remove user from waiting list or update status
        await this.waitingLocalModel.findByIdAndDelete(id).exec();
        return newUser;
      }
    
      // Reject user
      async rejectUser(id: string): Promise<WaitingLocal> {
        const waitingUser = await this.waitingLocalModel.findById(id).exec();
        if (!waitingUser) {
          throw new NotFoundException('User not found in waiting list');
        }
    
        // Update status to rejected
        waitingUser.status = 'rejected';
        return await waitingUser.save();
      }

      
      // Get all users from waiting list
      async getWaitingListAddLocal(): Promise<WaitingAddLocal[]> {
        return await this.waitingAddLocalModel.find({ status: 'pending' }).exec();
      }
    
      // Approve user
      async approveAddLocal(id: string): Promise<AddLocal> {
        const waitingAddLocal = await this.waitingAddLocalModel.findById(id).exec();
        if (!waitingAddLocal) {
          throw new NotFoundException('Add Local not found in waiting list');
        }
    
        // Move user to main user database
        const newAddLocal = new this.addLocalModel({
          type: waitingAddLocal.type,
          name: waitingAddLocal.name,
          information: waitingAddLocal.information,
          address: waitingAddLocal.address,
          longitude: waitingAddLocal.longitude,
          latitude: waitingAddLocal.latitude,
          profileImage: waitingAddLocal.profileImage,
          images: waitingAddLocal.images,
        });
    
        await newAddLocal.save();
        
        // Remove user from waiting list or update status
        await this.waitingAddLocalModel.findByIdAndDelete(id).exec();
        return newAddLocal;
      }
    
      // Reject user
      async rejectAddLocal(id: string): Promise<WaitingAddLocal> {
        const waitingAddLocal = await this.waitingAddLocalModel.findById(id).exec();
        if (!waitingAddLocal) {
          throw new NotFoundException('Add Local not found in waiting list');
        }
    
        // Update status to rejected
        waitingAddLocal.status = 'rejected';
        return await waitingAddLocal.save();
      }

    }

