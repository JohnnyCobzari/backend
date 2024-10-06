import { Injectable, NotFoundException } from '@nestjs/common';
import { AddLocalDto } from './dto/create-local.dto';
import { WaitingAddLocal } from './schemas/waiting-local.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLocalNotificationDto } from './dto/create-local-notification.dto';
import { LocalNotification } from './schemas/create-local-ntification.schema';
import { AddLocal } from './schemas/create-local.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './schemas/create-review.schema';


@Injectable()
export class LocalService {
    constructor(
        @InjectModel(WaitingAddLocal.name) private waitingLocalModel: Model<WaitingAddLocal>,
        @InjectModel(LocalNotification.name) private localNotificationModel: Model<LocalNotification>,
        @InjectModel(AddLocal.name) private LocalModel: Model<AddLocal>,
        @InjectModel(Review.name) private reviewModel: Model<Review>,
    ) {}

    async addToWaitingList(createLocalDto: AddLocalDto): Promise<WaitingAddLocal> {
        const waitinglocal = new this.waitingLocalModel({
          ...createLocalDto,
          status: 'pending',
        });
        return await waitinglocal.save();
      }

      async addToNotificationWaitingList(createLocalNotificationDto: CreateLocalNotificationDto): Promise<LocalNotification> {
        const waitinglocalnotification = new this.localNotificationModel({
          ...createLocalNotificationDto,
          status: 'pending',
        });
        return await waitinglocalnotification.save();
      }

      async getAllLocal(): Promise<AddLocal[]> {
        return await this.LocalModel.find();
      }

      async addReview(createReviewDto: CreateReviewDto): Promise<Review> {
        // Create the new review
        const review = new this.reviewModel(createReviewDto);
        await review.save();
    
        // Get all reviews for the local to calculate the new average
        const reviews = await this.reviewModel.find({ localId: createReviewDto.localId });
        const total = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = total / reviews.length;
    
        // Update the local's average rating
        const local = await this.LocalModel.findById(createReviewDto.localId);
        if (!local) {
          throw new NotFoundException('Local not found');
        }
        local.averageRating = averageRating;
        await local.save();
    
        return review;
      }

      async findById(id: string): Promise<AddLocal> {
    
        
        const local = await this.LocalModel.findById(id);
        if(!local) {
            throw new NotFoundException('Pet not found');
        }
        return local;
     }

     async findByUserId(id: string): Promise<AddLocal[]> {
      
        const locals = await this.LocalModel.find({userId: id});
        if(!locals) {
            throw new NotFoundException('Pet not found');
        }
        return locals;
     }

     async findAllReviews(id: string): Promise<Review[]> {
      
        const reviews = await this.reviewModel.find({localId: id});
        if(!reviews) {
            throw new NotFoundException('Pet not found');
        }
        return reviews;
     }
}
