import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { MsgType, MsgUnion } from './msg.types';
import { MsgAlertSchema } from './msg.alert.schema';
import { MsgInfoSchema } from './msg.info.schema';
import { MsgWarnSchema } from './msg.warn.schema';

export const discriminators = [
  { name: MsgType.Alert, schema: MsgAlertSchema },
  { name: MsgType.Info, schema: MsgInfoSchema },
  { name: MsgType.Warn, schema: MsgWarnSchema },
];

@Schema({ _id: false, discriminatorKey: 'type' })
export class Msg {
  @Prop({
    required: true,
    type: String,
    enum: discriminators.map((x) => x.name),
  })
  type: MsgType;
}

export type MsgDocument = HydratedDocument<MsgUnion>;
export const MsgSchema = SchemaFactory.createForClass(Msg);
