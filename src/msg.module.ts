import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MsgService } from './msg.service';
import { Msg, MsgSchema } from './schemas/msg.schema';
import { MsgType } from './schemas/msg.types';
import { MsgAlertSchema } from './schemas/msg.alert.schema';
import { MsgInfoSchema } from './schemas/msg.info.schema';
import { MsgWarnSchema } from './schemas/msg.warn.schema';

export const msgModuleFeatures = MongooseModule.forFeature([
  {
    name: Msg.name,
    schema: MsgSchema,
    discriminators: [
      { name: MsgType.Alert, schema: MsgAlertSchema },
      { name: MsgType.Info, schema: MsgInfoSchema },
      { name: MsgType.Warn, schema: MsgWarnSchema },
    ],
  },
]);

@Module({})
export class MsgModule {
  static forFeature(module: DynamicModule): DynamicModule {
    return {
      imports: [module],
      module: MsgService,
      controllers: [],
      providers: [MsgService],
    };
  }
}
