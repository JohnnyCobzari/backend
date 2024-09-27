import { Controller, Get, Post, Param, Body, NotFoundException,UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { WaitingLocal } from '../auth/schemas/waiting.schema';
import { Local } from '../auth/schemas/local.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { WaitingAddLocal } from 'src/local/schemas/waiting-local.schema';
import { AddLocal } from 'src/local/schemas/create-local.schema';
import { LocalNotification } from 'src/local/schemas/create-local-ntification.schema';
import { Notification } from 'src/notifications/schemas/notifications.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('waiting-list')
  async getWaitingListUsers(): Promise<WaitingLocal[]> {
    return this.adminService.getWaitingListUsers();
  }
@Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('approve/:id')
  async approveUser(@Param('id') id: string): Promise<Local> {
    const user = await this.adminService.approveUser(id);
    console.log("o ajuns");
    if (!user) {
      throw new NotFoundException('User not found or could not be approved');
    }
    return user;
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('reject/:id')
  async rejectUser(@Param('id') id: string): Promise<WaitingLocal> {
    const user = await this.adminService.rejectUser(id);
    if (!user) {
      throw new NotFoundException('User not found or could not be rejected');
    }
    return user;
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('waiting-list-add')
  async getWaitingListAddLocal(): Promise<WaitingAddLocal[]> {
    return this.adminService.getWaitingListAddLocal();
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('approve-add/:id')
  async approveAddLocal(@Param('id') id: string): Promise<AddLocal> {
    const AddLocal = await this.adminService.approveAddLocal(id);
    if (!AddLocal) {
      throw new NotFoundException('User not found or could not be approved');
    }
    return AddLocal;
  }
@Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('reject-add/:id')
  async rejectAddLocal(@Param('id') id: string): Promise<WaitingAddLocal> {
    const user = await this.adminService.rejectAddLocal(id);
    if (!user) {
      throw new NotFoundException('User not found or could not be rejected');
    }
    return user;
  }

  
  @Get('waiting-list-notification')
  async getWaitingListNotification(): Promise<LocalNotification[]> {
    return this.adminService.getWaitingListNotifciation();
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('approve-notification/:id')
  async approveNotification(@Param('id') id: string): Promise<Notification> {
    const Notification = await this.adminService.approveNotification(id);
    if (!Notification) {
      throw new NotFoundException('User not found or could not be approved');
    }
    return Notification;
  }
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post('reject-notification/:id')
  async rejectNotification(@Param('id') id: string): Promise<LocalNotification> {
    const notification = await this.adminService.rejectNotification(id);
    if (!notification) {
      throw new NotFoundException('User not found or could not be rejected');
    }
    return notification;
  }
}
