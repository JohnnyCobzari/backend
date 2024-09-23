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
@Controller('local')
export class LocalController {
    constructor(private readonly localService: LocalService) {}

    @Post('add-local')
    @UseGuards(AuthGuard('jwt'))
    async addToWaitingList(@Body() createLocalDto: AddLocalDto): Promise<WaitingAddLocal> {
        return this.localService.addToWaitingList(createLocalDto);
      }

      @Post('send-notification')
      @UseGuards(AuthGuard('jwt'))
      async addToNotificationWaitingList(@Body() createLocalNotificationDto: CreateLocalNotificationDto): Promise<LocalNotification> {
          return this.localService.addToNotificationWaitingList(createLocalNotificationDto);
        }

        @Get('all-locals')
      @UseGuards(AuthGuard('jwt'))
      async getAllLocals(): Promise<AddLocal[]> {
          return this.localService.getAllLocal();
        }

        @Post('create-review')
        @UseGuards(AuthGuard('jwt'))
        async createReview(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
          return this.localService.addReview(createReviewDto);
        }
}
