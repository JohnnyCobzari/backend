import { Controller, Get, Post, Param, Body, NotFoundException,UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { WaitingLocal } from '../auth/schemas/waiting.schema';
import { Local } from '../auth/schemas/local.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { WaitingAddLocal } from 'src/local/schemas/waiting-local.schema';
import { AddLocal } from 'src/local/schemas/create-local.schema';

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

  @Get('waiting-list-add')
  async getWaitingListAddLocal(): Promise<WaitingAddLocal[]> {
    return this.adminService.getWaitingListAddLocal();
  }
//   @Roles(Role.User)
//   @UseGuards( RolesGuard)
  @Post('approve-add/:id')
  async approveAddLocal(@Param('id') id: string): Promise<AddLocal> {
    const AddLocal = await this.adminService.approveAddLocal(id);
    if (!AddLocal) {
      throw new NotFoundException('User not found or could not be approved');
    }
    return AddLocal;
  }
//   @Roles(Role.User)
//   @UseGuards( RolesGuard)
  @Post('reject-add/:id')
  async rejectAddLocal(@Param('id') id: string): Promise<WaitingAddLocal> {
    const user = await this.adminService.rejectAddLocal(id);
    if (!user) {
      throw new NotFoundException('User not found or could not be rejected');
    }
    return user;
  }
}
