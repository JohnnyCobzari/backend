import { Controller , Get, UseGuards, Query, Delete, Param} from '@nestjs/common';
import { Cron} from "@nestjs/schedule";
import { NotificationService } from './notifications.service'; // Adjust path as needed
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Cron('0 0 * * *')
  async handleCron() {
    const newNotificationsCount = await this.notificationService.createNotifications();
    console.log(`Created ${newNotificationsCount} new notifications.`);
  }

  @Get()  
  @Roles(Role.User,Role.Admin, Role.local)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAllNotifications(@Query('userId') userId?: string){
    const userNotifications = await this.notificationService.findById(userId);

return userNotifications;
}

@Delete(':notificationId')
@Roles(Role.User,Role.Admin, Role.local)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
async deleteNotification(@Param('notificationId') notificationId: string) {
  const deletedNotification = await this.notificationService.deleteNotification(notificationId);
  return { message: 'Notification deleted successfully', deletedNotification };
}


}
