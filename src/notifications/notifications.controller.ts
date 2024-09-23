import { Controller , Get, UseGuards, Query, Delete, Param} from '@nestjs/common';
import { Cron} from "@nestjs/schedule";
import { NotificationService } from './notifications.service'; // Adjust path as needed
import { AuthGuard } from '@nestjs/passport';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Cron('0 0 * * *')
  async handleCron() {
    const newNotificationsCount = await this.notificationService.createNotifications();
    console.log(`Created ${newNotificationsCount} new notifications.`);
  }

  @Get()  
  @UseGuards(AuthGuard('jwt'))
  async getAllNotifications(@Query('userId') userId?: string){
    
    console.log(`Fetching notifications for user: ${userId}`);

    const userNotifications = await this.notificationService.findById(userId);

    console.log(`Notifications found: ${JSON.stringify(userNotifications)}`);

return userNotifications;
}

@Delete(':notificationId')
@UseGuards(AuthGuard('jwt'))
async deleteNotification(@Param('notificationId') notificationId: string) {
  const deletedNotification = await this.notificationService.deleteNotification(notificationId);
  return { message: 'Notification deleted successfully', deletedNotification };
}


}
