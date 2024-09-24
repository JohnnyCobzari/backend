import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { PetSchema } from './schemas/pet.schema';
import { AuthModule } from 'src/auth/auth.module';
import { MatchSchema } from './schemas/match.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: 'Pet', schema: PetSchema}]),
    MongooseModule.forFeature([{name: 'Match', schema: MatchSchema}])],
  controllers: [PetController],
  providers: [PetService]
})
export class PetModule {}
