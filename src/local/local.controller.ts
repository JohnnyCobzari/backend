import { Body, Controller, Get, Param, Post, UseGuards, ValidationPipe,  } from '@nestjs/common';
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
        @Roles(Role.User, Role.Admin)
        @UseGuards(AuthGuard('jwt'), RolesGuard)
        async createReview(@Body(new ValidationPipe({ transform: true })) createReviewDto: CreateReviewDto): Promise<Review> {
            try {
                console.log(createReviewDto); // Log the DTO
                return await this.localService.addReview(createReviewDto);
              } catch (error) {
                console.error('Error in createReview:', error);
                throw error;
              }
        }

        @Get('all-reviews/:id')
        @Roles(Role.User,Role.Admin, Role.local)
        @UseGuards(AuthGuard('jwt'), RolesGuard)
      async findAllReviews(@Param('id') localId: string): Promise<Review[]> {
          return this.localService.findAllReviews(localId);
        }

        @Get('one-local/:id')
@Roles(Role.User, Role.Admin, Role.local)
@UseGuards(AuthGuard('jwt'), RolesGuard)
async findById(@Param('id') localId: string): Promise<AddLocal> {
    return this.localService.findById(localId);
}

@Get('users-local/:id')
@Roles(Role.User, Role.Admin, Role.local)
@UseGuards(AuthGuard('jwt'), RolesGuard)
async findByUserId(@Param('id') userId: string): Promise<AddLocal[]> {
    return this.localService.findByUserId(userId);
}
}
