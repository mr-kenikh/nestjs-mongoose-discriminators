import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Msg, MsgDocument } from './schemas/msg.schema';
import { MsgUnion } from './schemas/msg.types';

@Injectable()
export class MsgService {
  constructor(
    @InjectModel(Msg.name)
    private readonly model: Model<MsgDocument>,
  ) {}

  create(msg: MsgUnion) {
    return new this.model(msg);
  }

  createMany(msgs: MsgUnion[]) {
    return msgs.map((msg) => this.create(msg));
  }
}
