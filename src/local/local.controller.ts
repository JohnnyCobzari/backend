import { Body, Controller, Get, Post, UseGuards,  } from '@nestjs/common';
import { LocalService } from './local.service';
import { AddLocalDto } from './dto/create-local.dto';
import { WaitingAddLocal } from './schemas/waiting-local.schema';
import { AuthGuard } from '@nestjs/passport';
import { CreateLocalNotificationDto } from './dto/create-local-notification.dto';
import { LocalNotification } from './schemas/create-local-ntification.schema';
import { AddLocal } from './schemas/create-local.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './schemas/create-review.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@Controller('local')
export class LocalController {
    constructor(private readonly localService: LocalService) {}

    @Post('add-local')
    @Roles( Role.local)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
    async addToWaitingList(@Body() createLocalDto: AddLocalDto): Promise<WaitingAddLocal> {
        return this.localService.addToWaitingList(createLocalDto);
      }

      @Post('send-notification')
      @Roles(Role.local, Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
      async addToNotificationWaitingList(@Body() createLocalNotificationDto: CreateLocalNotificationDto): Promise<LocalNotification> {
          return this.localService.addToNotificationWaitingList(createLocalNotificationDto);
        }

        @Get('all-locals')
        @Roles(Role.User,Role.Admin, Role.local)
        @UseGuards(AuthGuard('jwt'), RolesGuard)
      async getAllLocals(): Promise<AddLocal[]> {
          return this.localService.getAllLocal();
        }

        @Post('create-review')
        @Roles(Role.User)
        @UseGuards(AuthGuard('jwt'), RolesGuard)
        async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
          return this.localService.addReview(createReviewDto);
        }
}
