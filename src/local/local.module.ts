import { Module } from '@nestjs/common';
import { LocalController } from './local.controller';
import { LocalService } from './local.service';
import { AddLocal, AddLocalSchema } from './schemas/create-local.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WaitingAddLocal, WaitingAddLocalSchema } from './schemas/waiting-local.schema';
import { LocalNotificationSchema } from './schemas/create-local-ntification.schema';
import { Review, ReviewSchema } from './schemas/create-review.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AddLocal', schema: AddLocalSchema }]),
    MongooseModule.forFeature([{ name: 'WaitingAddLocal', schema: WaitingAddLocalSchema }]),
    MongooseModule.forFeature([{ name: 'LocalNotification', schema: LocalNotificationSchema }]),
    MongooseModule.forFeature([{ name: 'Review', schema: ReviewSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), 
  ],
  controllers: [LocalController],
  providers: [LocalService]
})
export class LocalModule {}
