import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MsgService } from './msg.service';
import { discriminators, Msg, MsgSchema } from './schemas/msg.schema';

export const msgModuleFeatures = MongooseModule.forFeature([
  {
    name: Msg.name,
    schema: MsgSchema,
    discriminators,
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
