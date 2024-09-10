import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { PetSchema } from './schemas/pet.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: 'Pet', schema: PetSchema}])],
  controllers: [PetController],
  providers: [PetService]
})
export class PetModule {}
