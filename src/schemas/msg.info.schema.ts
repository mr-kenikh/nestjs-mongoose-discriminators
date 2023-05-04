import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Msg } from './msg.schema';
import { MsgType } from './msg.types';

@Schema({ _id: false })
export class MsgInfo implements Msg {
  @Prop({ required: true })
  info: string;

  // implemented
  type: MsgType.Info;
}

export const MsgInfoSchema = SchemaFactory.createForClass(MsgInfo);
