import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { discriminators, MsgSchema } from './msg.schema';
import { MsgUnion } from './msg.types';

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

for (const discriminator of discriminators) {
  ResourceSchema.path<MongooseSchema.Types.Array>('msgs').discriminator(
    discriminator.name,
    discriminator.schema,
  );
}
