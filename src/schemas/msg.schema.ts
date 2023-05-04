import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MsgType, MsgUnion } from './msg.types';

@Schema({ _id: false, discriminatorKey: 'type' })
export class Msg {
  @Prop({
    required: true,
    type: String,
    enum: [MsgType.Alert, MsgType.Info, MsgType.Warn],
  })
  type: MsgType;
}

export type MsgDocument = HydratedDocument<MsgUnion>;
export const MsgSchema = SchemaFactory.createForClass(Msg);
