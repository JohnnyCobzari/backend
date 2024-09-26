
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WaitingLocal } from '../auth/schemas/waiting.schema';
import { Local } from '../auth/schemas/local.schema'; // Assuming you have a User schema for the main database
import { WaitingAddLocal } from 'src/local/schemas/waiting-local.schema';
import { AddLocal } from 'src/local/schemas/create-local.schema';
import { LocalNotification } from 'src/local/schemas/create-local-ntification.schema';
import { Notification } from 'src/notifications/schemas/notifications.schema';

@Injectable()
export class AdminService {

    constructor(
        @InjectModel(WaitingLocal.name) private waitingLocalModel: Model<WaitingLocal>,
        @InjectModel(Local.name) private localModel: Model<Local>,
        @InjectModel(WaitingAddLocal.name) private waitingAddLocalModel: Model<WaitingAddLocal>,
        @InjectModel(AddLocal.name) private addLocalModel: Model<AddLocal>,
        @InjectModel(LocalNotification.name) private localNotificationModel: Model<LocalNotification>,
        @InjectModel(Notification.name) private notificationModel: Model<Notification>,
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
          companyDirector: waitingUser.companyDirector,
          email: waitingUser.email,
          password: waitingUser.password, // Password is already hashed
          documentImageUrl: waitingUser.documentImageUrl,
          userPhotoUrls: waitingUser.userPhotoUrls,
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
      
        // Move local to main database
        const newAddLocal = new this.addLocalModel({
          type: waitingAddLocal.type,
          name: waitingAddLocal.name,
          information: waitingAddLocal.information,
          address: waitingAddLocal.address,
          longitude: waitingAddLocal.longitude,
          latitude: waitingAddLocal.latitude,
          profileImage: waitingAddLocal.profileImage,
          images: waitingAddLocal.images,
          userId: waitingAddLocal.userId,  // Assuming AddLocal has a userId field
        });
      
        await newAddLocal.save();
      
        // Remove local from waiting list
        await this.waitingAddLocalModel.findByIdAndDelete(id).exec();
      
        // Create a notification for the user who created the local
        const notification = new this.notificationModel({
          userId: waitingAddLocal.userId,  // Assign the userId of the creator
          message: `Your Add Local request for "${waitingAddLocal.name}" has been approved!`,
          createdAt: new Date(),
        });
      
        await notification.save();
      
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

        const notification = new this.notificationModel({
          userId: waitingAddLocal.userId,  // Assign the userId of the creator
          message: `Your Add Local request for "${waitingAddLocal.name}" has been rejected!`,
          createdAt: new Date(),
        });
      
        await notification.save();
        return await waitingAddLocal.save();
      }

      async getWaitingListNotifciation(): Promise<LocalNotification[]> {
        return await this.localNotificationModel.find({ status: 'pending' }).exec();
      }
    
      // Approve user
      async approveNotification(id: string): Promise<Notification> {
        const waitingNotification = await this.localNotificationModel.findById(id).exec();
        if (!waitingNotification) {
          throw new NotFoundException('No waiting notifications found');
        }
    
        // Move user to main user database
        const newNotification = new this.notificationModel({
          message: waitingNotification.message,
          createdAt: waitingNotification.createdAt,
          userId: waitingNotification.userId,
          destination: 'all'
        });
    
        await newNotification.save();

        const notification = new this.notificationModel({
          userId: waitingNotification.userId,  // Assign the userId of the creator
          message: `Your notification has been approved!`,
          createdAt: new Date(),
        });
      
        await notification.save();
        // Remove user from waiting list or update status
        await this.localNotificationModel.findByIdAndDelete(id).exec();
        return newNotification;
      }
    
      // Reject user
      async rejectNotification(id: string): Promise<LocalNotification> {
        const waitingNotification = await this.localNotificationModel.findById(id).exec();
        if (!waitingNotification) {
          throw new NotFoundException('Notification not found in waiting list');
        }
    
        const notification = new this.notificationModel({
          userId: waitingNotification.userId,  // Assign the userId of the creator
          message: `Your notification has been rejected!`,
          createdAt: new Date(),
        });
      
        await notification.save();
        // Update status to rejected
        waitingNotification.status = 'rejected';
        return await waitingNotification.save();
      }

    }

