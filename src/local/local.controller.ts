import { Body, Controller, Post, UseGuards,  } from '@nestjs/common';
import { LocalService } from './local.service';
import { AddLocalDto } from './dto/create-local.dto';
import { WaitingAddLocal } from './schemas/waiting-local.schema';
import { AuthGuard } from '@nestjs/passport';
@Controller('local')
export class LocalController {
    constructor(private readonly localService: LocalService) {}

    @Post('add-local')
    @UseGuards(AuthGuard('jwt'))
    async addToWaitingList(@Body() createLocalDto: AddLocalDto): Promise<WaitingAddLocal> {
        return this.localService.addToWaitingList(createLocalDto);
      }
}
