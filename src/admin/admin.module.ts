import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalSchema } from 'src/auth/schemas/local.schema';
import { WaitingUserSchema } from 'src/auth/schemas/waiting.schema';
import { AddLocalSchema } from 'src/local/schemas/create-local.schema';
import { WaitingAddLocalSchema } from 'src/local/schemas/waiting-local.schema';
import { LocalNotificationSchema } from 'src/local/schemas/create-local-ntification.schema';
import { NotificationSchema } from 'src/notifications/schemas/notifications.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: 'Local', schema: LocalSchema}]),
    MongooseModule.forFeature([{name: 'WaitingLocal', schema: WaitingUserSchema}]),
    MongooseModule.forFeature([{name: 'AddLocal', schema: AddLocalSchema}]),
    MongooseModule.forFeature([{name: 'WaitingAddLocal', schema: WaitingAddLocalSchema}]),
    MongooseModule.forFeature([{name: 'Notification', schema: NotificationSchema}]),
    MongooseModule.forFeature([{name: 'LocalNotification', schema: LocalNotificationSchema}])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
