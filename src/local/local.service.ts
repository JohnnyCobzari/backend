import { Injectable } from '@nestjs/common';
import { AddLocalDto } from './dto/create-local.dto';
import { WaitingAddLocal } from './schemas/waiting-local.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class LocalService {
    constructor(
        @InjectModel(WaitingAddLocal.name) private waitingLocalModel: Model<WaitingAddLocal>,
    ) {}

    async addToWaitingList(createLocalDto: AddLocalDto): Promise<WaitingAddLocal> {
        const waitinglocal = new this.waitingLocalModel({
          ...createLocalDto,
          status: 'pending',
        });
        return await waitinglocal.save();
      }
}
