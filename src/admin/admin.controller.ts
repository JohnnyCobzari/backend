import { Controller, Get, Post, Param, Body, NotFoundException,UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { WaitingLocal } from '../auth/schemas/waiting.schema';
import { Local } from '../auth/schemas/local.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
//   @Roles(Role.User)
//   @UseGuards( RolesGuard)
  @Get('waiting-list')
  async getWaitingListUsers(): Promise<WaitingLocal[]> {
    return this.adminService.getWaitingListUsers();
  }
//   @Roles(Role.User)
//   @UseGuards( RolesGuard)
  @Post('approve/:id')
  async approveUser(@Param('id') id: string): Promise<Local> {
    const user = await this.adminService.approveUser(id);
    if (!user) {
      throw new NotFoundException('User not found or could not be approved');
    }
    return user;
  }
//   @Roles(Role.User)
//   @UseGuards( RolesGuard)
  @Post('reject/:id')
  async rejectUser(@Param('id') id: string): Promise<WaitingLocal> {
    const user = await this.adminService.rejectUser(id);
    if (!user) {
      throw new NotFoundException('User not found or could not be rejected');
    }
    return user;
  }
}
