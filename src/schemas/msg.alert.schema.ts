import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Msg } from './msg.schema';
import { MsgType } from './msg.types';

@Schema({ _id: false })
export class MsgAlert implements Msg {
  @Prop({ required: true })
  action: string;

  @Prop({ required: true, type: Number })
  instance_id: string | number;

  // implemented
  type: MsgType.Alert;
}

export const MsgAlertSchema = SchemaFactory.createForClass(MsgAlert);
