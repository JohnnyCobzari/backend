import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalSchema } from 'src/auth/schemas/local.schema';
import { WaitingUserSchema } from 'src/auth/schemas/waiting.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: 'Local', schema: LocalSchema}]),
    MongooseModule.forFeature([{name: 'WaitingLocal', schema: WaitingUserSchema}])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
