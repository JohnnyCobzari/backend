import { Controller , Get, UseGuards, Query} from '@nestjs/common';
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
  async getAllPets(@Query('userId') userId?: string){
    const userNotifications = await this.notificationService.findById(userId);

return userNotifications;
}


}
