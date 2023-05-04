import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { MsgUnion } from './msg.types';
import { MsgSchema } from './msg.schema';

@Schema({
  toJSON: {
    transform(_, ret) {
      delete ret._id;
      return ret;
    },
  },
  versionKey: false,
})
export class Resource {
  @Prop({ required: true, type: Number })
  index: string | number;

  @Prop({ required: true, type: [MsgSchema] })
  msgs: MsgUnion[];
}

export type ResourceDocument = HydratedDocument<Resource>;
export const ResourceSchema = SchemaFactory.createForClass(Resource);
