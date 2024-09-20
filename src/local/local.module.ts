import { Module } from '@nestjs/common';
import { LocalController } from './local.controller';
import { LocalService } from './local.service';
import { AddLocal, AddLocalSchema } from './schemas/create-local.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WaitingAddLocal, WaitingAddLocalSchema } from './schemas/waiting-local.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AddLocal', schema: AddLocalSchema }]),
    MongooseModule.forFeature([{ name: 'WaitingAddLocal', schema: WaitingAddLocalSchema }]),
  ],
  controllers: [LocalController],
  providers: [LocalService]
})
export class LocalModule {}
