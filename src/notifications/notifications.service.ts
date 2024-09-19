import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from 'src/pet/schemas/pet.schema';
import { Notification } from './schemas/notifications.schema';
import mongoose from 'mongoose';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification>,
    @InjectModel(Pet.name) private petModel: Model<Pet>,
  ) {}

  async createNotifications(): Promise<number> {
    const now = new Date();
    const checkDates = [0, 3, 7]; // Days before the event
    let newNotificationsCount = 0;

    // Find users with upcoming vaccination dates
    const pets = await this.petModel.find({ 'vaccines.dateAdministered': { $exists: true } });

    for (const pet of pets) {
      for (const vaccine of pet.vaccines) {
        const vaccinationDate = new Date(vaccine.dateAdministered);
        const daysBefore = Math.floor((vaccinationDate.getTime() - now.getTime()) / (1000 * 3600 * 24));

        if (checkDates.includes(daysBefore)) {
          const notification = new this.notificationModel({
            message: `Upcoming vaccination for ${pet.petName}: ${vaccine.name} on ${vaccinationDate.toDateString()}`,
            createdAt: now,
            userId: pet.userId,
          });
          await notification.save();
          newNotificationsCount++;
        }
      }
    }

    return newNotificationsCount;
  }

  async findById(userId: string): Promise<Notification[]> {
    const isValidId = mongoose.isValidObjectId(userId);
    console.log(userId);
    if (!isValidId) {
        throw new BadRequestException('Please enter a correct user ID');
    }

    const notifications = await this.notificationModel.find({ userId: userId });
    if (notifications.length === 0) {
        throw new NotFoundException('No notifications found for this user');
    }

    return notifications;
}

async deleteNotification(notificationId: string): Promise<Notification> {
    const deletedNotification = await this.notificationModel.findByIdAndDelete(notificationId);
    if (!deletedNotification) {
      throw new NotFoundException('Notification not found');
    }
    return deletedNotification;
  }
}
