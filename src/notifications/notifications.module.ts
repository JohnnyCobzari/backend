import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationController } from './notifications.controller';
import { NotificationService } from './notifications.service';
import { Notification, NotificationSchema } from './schemas/notifications.schema';
import { Pet, PetSchema } from 'src/pet/schemas/pet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    MongooseModule.forFeature([{ name: Pet.name, schema: PetSchema }]),
    ScheduleModule.forRoot(),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
