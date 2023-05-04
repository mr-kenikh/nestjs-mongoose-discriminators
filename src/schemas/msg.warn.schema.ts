import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Msg } from './msg.schema';
import { MsgType } from './msg.types';

@Schema({ _id: false })
export class MsgWarn implements Msg {
  @Prop({ required: true })
  data: string;

  // implemented
  type: MsgType.Warn;
}

export const MsgWarnSchema = SchemaFactory.createForClass(MsgWarn);
